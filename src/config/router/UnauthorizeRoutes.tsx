import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from 'src/Pages/SignIn';
import { page } from 'src/constants/page';
import NotFount from 'src/Components/NotFound/NotFount';

export default function UnauthorizedRoutes() {
  return (
    <Routes>
      <Route path={page.signIn} element={<SignIn />} />
      <Route path="*" element={<NotFount />} />
    </Routes>
  );
}
