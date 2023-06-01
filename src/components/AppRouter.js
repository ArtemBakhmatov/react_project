import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router';
import { AuthContext } from '../context';
import Loader from './UI/loader/Loader';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);
    console.log(isAuth);

    if (isLoading) {
        return <Loader />
    }
    
    return (
        <Routes>
            {isAuth 
                ?
                    privateRoutes.map(route => 
                        <Route 
                            key={route.path}
                            path={route.path} 
                            element={<route.component />} 
                            exact={route.exact}
                        /> 
                    )
                :
                    publicRoutes.map(route => 
                        <Route 
                            key={route.path}
                            path={route.path} 
                            element={<route.component />} 
                            exact={route.exact}
                        /> 
                    )
            }
        </Routes>  
        
    );
};
// exact нужен для того что бы роутер понимал что роуты все разные
export default AppRouter;
