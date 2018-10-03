import asyncio
import hashlib
import logging

from aiohttp import web

from config.config import config
from config.constants import constants
from model import User, Session

import datetime

async def authenticate_cookie(cookie, user_agent):
    cookie_list = cookie.split('-')
    if len(cookie_list) != 2:
        return web.HTTPBadRequest(body='invalid cookie %s' % cookie_list)

    userId,sha1 = cookie.split('-')
    
    user = await User.find(key='userId', value=userId)
    
    if not user:
        return web.HTTPBadRequest(body='invalid cookie: user not found')
    
    s = '%s-%s' % (userId, user_agent)

    sessionId = hashlib.sha1(s.encode('utf-8')).hexdigest()

    session = await Session.find(key='sessionId', value=sessionId)
    if not session:
        return web.HTTPBadRequest(body='invalid cookie: session not found')
        
    s = '%s-%s-%s-%s-%s' % (user.username, user.password, session.expire, user.email, config.cookie_key)
    db_sha1 = hashlib.sha1(s.encode('utf-8')).hexdigest()
    
    logging.debug('[AUTHENTICATE] sha1 fetched from db %s generated from %s' % (db_sha1, s))

    if sha1 != db_sha1:
        return web.HTTPBadRequest(body='invalid cookie: failed to validate credentials')

    return [user, session]

async def authentication_factory(app, handler):
    async def response(request):
        request.user = None
        request.session = None

        cookie = request.cookies.get(config.cookie_name)
        if cookie:
            authResult = await authenticate_cookie(cookie, request.headers['User-Agent'])
            if isinstance(authResult, web.StreamResponse):
                return authResult

            request.user, request.session = authResult

        return await handler(request)
    return response

async def cors_factory(app, handler):
    async def response(request):
        resp = web.HTTPOk(body='accepted') if request.method == 'OPTIONS' else await handler(request)
        
        resp.headers['Access-Control-Allow-Origin'] = 'http://localhost:8000'
        resp.headers['Access-Control-Allow-Methods'] = 'OPTIONS, POST, GET, DELETE, PUT'
        resp.headers['Access-Control-Allow-Credentials'] = 'true'
        resp.headers['Access-Control-Allow-Headers'] = 'content-type'
        return resp
    return response
