import request from './request.js';

export const registerApi = request.createRestApi({
	url : BASE_URL + '/api/user/register', 
	method : 'POST', 
	credentials : 'include',
});

export const userInfoApi = request.createRestApi({
	url : BASE_URL + '/api/user/info',
	method : 'GET',
	credentials : 'include',
});

export const logoutApi = request.createRestApi({
	url : BASE_URL + '/api/user/signout',
	method : 'POST',
	credentials : 'include',
})

export const loginApi = request.createRestApi({
	url : BASE_URL + '/api/user/login',
	method : 'POST',
	credentials : 'include',
})

export const saveApi = request.createRestApi({
	url : BASE_URL + '/api/edit/save',
	method : 'POST',
	credentials : 'include',
})

export const uploadApi = request.createRestApi({
	url : BASE_URL + '/api/edit/upload',
	method : 'FILE',
	credentials : 'include',
});

export const postsApi = request.createRestApi({
	url : BASE_URL + '/api/posts',
	method : 'GET',
	credentials : 'include',
})

export const postApi = request.createRestApi({
	url : BASE_URL + '/api/post',
	method : 'GET',
	credentials : 'include',
});

export const tagsApi = request.createRestApi({
	url : BASE_URL + '/api/tags',
	method : 'GET',
	credentials : 'include',
});

export const deleteApi = request.createRestApi({
	url : BASE_URL + '/api/edit/delete',
	method : 'POST',
	credentials : 'include',
});
