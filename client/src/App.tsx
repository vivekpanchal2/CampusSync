import React from "react";
import Navbar from "./components/common/Navbar";
import Home from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/AuthPage";
import ClubDetailsPage from "./pages/ClubDetailsPage";
import ClubForm from "./pages/CreateClub";
import CreateEvent from "./pages/CreateEvent";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import Dashboard from "./pages/Dashboard";
import HostedEventDetails from "./pages/HostedEventDetails";
import ClubsPage from "./pages/ClubsPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AllUsers from "./components/Admin/AllUsers";
import AllEvents from "./components/Admin/AllEvents";
import AllClubs from "./components/Admin/AllClubs";
import EventDetails from "./pages/Admin/EventDetails";
import EnrollEvents from "./components/Dashboard/EnrolledEvents";
import HostedEvents from "./components/Dashboard/HostedEvents";
import JoinedClubs from "./components/Dashboard/JoinedClubs";
import ClubFullDetails from "./pages/Admin/ClubFullDetails";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import NotFoundPage from "./components/common/NotFoundPage";
import PostsPage from "./pages/PostsPage";
import CreatePostPage from "./components/Posts/CreatePost";
import MyPostsPage from "./components/Dashboard/myPosts";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/clubs/:clubId" element={<ClubDetailsPage />} />
        <Route path="/events/:eventId" element={<EventDetailsPage />} />

        <Route
          path="/events/createEvent"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/myEvents/:eventId"
          element={
            <ProtectedRoute>
              <HostedEventDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="enrolled" element={<EnrollEvents />} />
          <Route path="hosted" element={<HostedEvents />} />
          <Route path="clubs" element={<JoinedClubs />} />
          <Route path="posts" element={<MyPostsPage />} />
        </Route>

        {/* Admin Routes */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="users" element={<AllUsers />} />
          <Route path="events" element={<AllEvents />} />
          <Route path="clubs" element={<AllClubs />} />
        </Route>

        <Route
          path="/admin/events/:eventId"
          element={
            <ProtectedRoute adminOnly={true}>
              <EventDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/clubs/createClub"
          element={
            <ProtectedRoute adminOnly={true}>
              <ClubForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard/clubs/:clubId"
          element={
            <ProtectedRoute adminOnly={true}>
              <ClubFullDetails />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/createPost" element={<CreatePostPage />} />
      </Routes>
    </>
  );
};

export default App;
