import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router';

const AppRouter = () => {
    const isAuth = false;
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
