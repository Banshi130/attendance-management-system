import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App/App";

import LogIn from "./LogIn/LogIn";
import NotFound from "./NotFound/NotFound";
import Users from "./Users/Users";
import Menu from './Menu/Menu'
import Calendar from "./Calendar/Calendar";
import Tasks from "./Tasks/Tasks";
import Profile from "./Profile/Profile";

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<LogIn />} />
                <Route path="profile" element={<Profile />} />
                
                <Route path="login" element={<LogIn />} />
                <Route path="users" element={<Users />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
        </BrowserRouter>
    )
}

export default Router;