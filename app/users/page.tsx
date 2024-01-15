import { UserService } from "@api/services";

export default async function Users() {
  const users = await UserService.getAllUsers();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.firstName}</li>
        ))}
      </ul>
    </div>
  );
}
