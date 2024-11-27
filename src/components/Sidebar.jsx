import { Link } from "react-router-dom";

const Sidebar = () => (
  <div className="w-64 h-screen bg-gray-800 text-white">
    <ul className="space-y-4 mt-8">
      <li>
        <Link to="/users" className="block px-4 py-2 hover:bg-gray-700 rounded">
          Users
        </Link>
      </li>
      <li>
        <Link to="/roles" className="block px-4 py-2 hover:bg-gray-700 rounded">
          Roles
        </Link>
      </li>
      <li>
        <Link
          to="/permissions"
          className="block px-4 py-2 hover:bg-gray-700 rounded"
        >
          Permissions
        </Link>
      </li>
    </ul>
  </div>
);

export default Sidebar;
