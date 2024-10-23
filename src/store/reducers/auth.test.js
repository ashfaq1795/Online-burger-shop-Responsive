//if we don't put too much complex logic in action creator, then testing reducers are too much easy.
// Even we don't need enzyme as we are not testing any react component i,e we don't render any component.

import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth Reducer', ()=>{
    it('should return the initial state', ()=>{
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })

    it('should store the token upon login', ()=>{
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            token: 'some-token',
            userId: 'some-id'
        })).toEqual(
            {
                token: 'some-token',
                userId: 'some-id',
                error: null,
                loading: false,
                authRedirectPath: '/'
            }
        )
    })
})