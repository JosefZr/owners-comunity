// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Chat,
  Login,
  SuccessPage,
} from "./pages";

import Dashboard from "./pages/Dashboard";
import Instructor from "./pages/Instructor";
import AddNewCourse from "./pages/AddNewCourse";
import StudentViewCommonLayout from "./pages/StudentView";
import StudentViewCourseDetailsPage from "./pages/course-details";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Friends from "./pages/Friends";
import UserChat from "./pages/chat/UserChat";
import DentalStuff from "./pages/DentalStuff";

import ProtectedRoutes from "./utils/ProtectedRoutes";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SignupAdmins from "./pages/SignupAmins";
import Quotes from "./pages/Quotes";
import Privacy from "./pages/Privacy";
import Landing from "./pages/landing";
import WaitingList from "./pages/landing/waiting-list";
import Emails from "./pages/emails";
import usePixel from "./hooks/pixel/usePixel";
import GrowthSupport from "./pages/growth-support";
import Home from "./pages/Notification";
import AiAutomation from "./pages/ai-automation";
import Parlor from "./pages/parlor";

export default function App() {
  usePixel(); // Add this at top level
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/instructor" element={<Instructor />} />
        <Route path="/instructor/create-new-course" element={<AddNewCourse />} />
        <Route path="/instructor/edit-course/:courseId" element={<AddNewCourse />} />
        <Route path="/course" element={<StudentViewCommonLayout />} />
        <Route path="/course/details/:id/:moduleId/:lectureId" element={<StudentViewCourseDetailsPage />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="friends" element={<Friends />} />
          <Route path="userChat" element={<UserChat />} />
          <Route path="dental-stuff" element={<DentalStuff />} />
          <Route path="quotes" element={<Quotes />} />
          <Route path="users" element={<Users />} />
          <Route path="analyse" element={<Emails />} />
          {/* <Route path="emails" element={<Emails/>}/> */}
        </Route>

        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/channels/:channelId?" element={<Chat />} />
        <Route path="/chat2/*" element={<Chat />} />
        <Route path="/chat3/*" element={<Chat />} />
        <Route path="/growth-support/*" element={<Chat />} />
        <Route path="/top-dentist-opportunity/*" element={<Chat />} />
        <Route path="/job-opportunities/*" element={<Chat />} />
        <Route path="/sunnah/*" element={<Chat />} />

      </Route>
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/" element={<AiAutomation />} />
      <Route path="/parlor" element={<Parlor />} />
      {/* <Route path="/:name" element={<Landing />} /> */}
      <Route path="/marketing" element={<GrowthSupport />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/sign-up" element={<WaitingList />} />
      <Route path="/chama" element={<SignupAdmins />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/waiting-list" element={<WaitingList />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
}
