import reducer from './auth';
import * as actions from '../actions/actionTypes';

describe("Auth test" , () => {
    it("Test initial state" , () => {
        expect(reducer(undefined , {})).toEqual({
            token:null,
            userid:null,
            error:null,
            loading:false
        })
    })

    it("Should save token" , () => {
        expect(reducer({token:null,
            userid:null,
            error:null,
            loading:false} , {
                type:actions.AUTH_SUCCESS,
                token:'token',
                userid:'userid'
            })).toEqual({
                token:'token',
                userid:'userid',
                error:null,
                loading:false
            })
    })
} );