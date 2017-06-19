import Vue from 'vue'
import Router from 'vue-router'

import home from '@/views/home/home';
import login from '@/views/login/login';
import regist from '@/views/regist/regist';

import movie from '@/components/movie/movie';
import movie_detail from '@/components/movie/movie_detail';

import music from '@/components/music/music';
import music_list from '@/components/music/music_list';
import music_play from '@/components/music/music_play';

import photo from '@/components/photo/photo';
import photo_detail from '@/components/photo/photo_detail';

import book from '@/components/book/book';

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/home',
        name: 'home',
        component: home,
        children: [{
            path: 'movie',
            name: 'movie',
            component: movie
        }, {
            path: 'music',
            name: 'music',
            component: music
        }, {
            path: 'book',
            name: 'book',
            component: book
        }, {
            path: 'photo',
            name: 'photo',
            component: photo
        }]
    }, {
        path: '/login',
        name: 'login',
        component: login
    }, {
        path: '/regist',
        name: 'regist',
        component: regist
    }, {
        path: '/home/movie/detail/:id',
        name: 'movie-detail',
        component: movie_detail
    }, {
        path: '/home/music/list/:listId',
        name: 'music-list',
        component: music_list
    }, {
        path: '/home/music/list/:listId/song/:songId',
        name: 'music-play',
        component: music_play
    }, {
        path: '/home/photo/detail/:id',
        name: 'photo-detail',
        component: photo_detail
    }, {
        path: '*',
        redirect: './login'
    }]
});