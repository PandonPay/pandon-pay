import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center p-8 rounded-xl shadow-lg bg-white max-w-md w-full mx-4">
        <h1 className="text-6xl font-bold mb-6 text-green-primary">404</h1>
        <p className="text-2xl text-gray-700 mb-6">Oops! 页面未找到</p>
        <p className="text-gray-500 mb-8">
          您访问的页面 {location.pathname} 不存在
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-green-primary text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
        >
          返回首页
        </a>
      </div>
    </div>
  );
};

export default NotFound;
