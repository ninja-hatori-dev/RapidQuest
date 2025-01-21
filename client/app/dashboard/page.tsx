'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { createTodo, getTodos, updateTodo } from '@/lib/api';
import { Todo } from '@/app/types';
import { CheckCircle2, ListTodo, LogOut, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    fetchTodos();
  }, [router]);

  const fetchTodos = async () => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) return;

    try {
      const data = await getTodos(token);
      setTodos(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch todos',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    const formData = new FormData(e.currentTarget);
    try {
      const newTodo = await createTodo(token, {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
      });
      console.log(newTodo.created_at);
      setTodos([...todos, newTodo]);
      setIsDialogOpen(false);
      toast({
        title: 'Success',
        description: 'Todo created successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create todo',
        variant: 'destructive',
      });
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    const token = localStorage.getItem('token');
    if (!token) return;
  
    try {
      // Send the opposite of current completion status
      const updatedTodo = await updateTodo(token, todo.id, {
        completed: !todo.completed,
      });
      
      // Update the local state with the response from the server
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === todo.id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update todo',
        variant: 'destructive',
      });
    }
  };
  


  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ListTodo className="h-6 w-6" />
            <h1 className="text-xl font-bold">TaskMaster</h1>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Tasks</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleCreateTodo}>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>
                    Add a new task to your list
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Task</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {todos.map((todo) => (
            <Card key={todo.id}>
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => handleToggleTodo(todo)}
                    />
                    <span className={todo.completed ? 'line-through text-muted-foreground' : ''}>
                      {todo.title}
                    </span>
                  </div>
                  
                </CardTitle>
                <CardDescription>
                  {new Date(todo.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className={todo.completed ? 'line-through text-muted-foreground' : ''}>
                  {todo.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {todos.length === 0 && (
          <Card className="mt-8">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-center">No tasks yet</p>
              <p className="text-muted-foreground text-center">
                Click the &quot;Add Task&quot; button to create your first task
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}