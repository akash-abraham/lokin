import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Dummy user data
const user = {
  username: "johndoe",
  email: "johndoe@example.com",
  points: 1250,
  avatarUrl: "https://i.pravatar.cc/150?u=johndoe@example.com"
}

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">User Dashboard</h1>
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <Avatar className="h-16 w-16 mr-4">
              <AvatarImage src={user.avatarUrl} alt={user.username} />
              <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-bold">{user.username}'s Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">Username</span>
                  <span className="text-lg font-semibold">{user.username}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">Email</span>
                  <span className="text-lg font-semibold">{user.email}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Points</span>
                <span className="text-3xl font-bold text-primary">{user.points}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}