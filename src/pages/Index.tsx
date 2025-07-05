import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PocketMoneyTracker } from "@/components/PocketMoneyTracker";
import { 
  Home, 
  CheckSquare, 
  Calendar, 
  PiggyBank, 
  Pill, 
  Receipt,
  Users,
  Heart
} from "lucide-react";

const Index = () => {
  const [familyName] = useState("Sharma");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
      {/* Header */}
      <div className="gradient-primary text-white py-8 px-4 shadow-glow animate-fade-in">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Home className="w-10 h-10 mr-3" />
            <h1 className="text-4xl font-bold">The {familyName}'s</h1>
          </div>
          <p className="text-xl opacity-90">Your Family Command Center</p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Heart className="w-5 h-5 text-red-300" />
            <span className="text-lg">Organized • Connected • Happy</span>
            <Heart className="w-5 h-5 text-red-300" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 -mt-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 bg-white shadow-medium rounded-xl p-2">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="chores" className="flex items-center space-x-2">
              <CheckSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Chores</span>
            </TabsTrigger>
            <TabsTrigger value="planning" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Plans</span>
            </TabsTrigger>
            <TabsTrigger value="money" className="flex items-center space-x-2">
              <PiggyBank className="w-4 h-4" />
              <span className="hidden sm:inline">Money</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center space-x-2">
              <Pill className="w-4 h-4" />
              <span className="hidden sm:inline">Health</span>
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center space-x-2">
              <Receipt className="w-4 h-4" />
              <span className="hidden sm:inline">Expenses</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Family Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 gradient-kids text-white shadow-glow animate-scale-in">
                <div className="text-center">
                  <Users className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold">Family Members</h3>
                  <p className="text-2xl font-bold">4</p>
                </div>
              </Card>
              
              <Card className="p-6 bg-primary text-white shadow-glow animate-scale-in" style={{ animationDelay: "0.1s" }}>
                <div className="text-center">
                  <CheckSquare className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold">Today's Tasks</h3>
                  <p className="text-2xl font-bold">7</p>
                </div>
              </Card>
              
              <Card className="p-6 bg-accent-kids text-white shadow-glow animate-scale-in" style={{ animationDelay: "0.2s" }}>
                <div className="text-center">
                  <PiggyBank className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold">Kids' Savings</h3>
                  <p className="text-2xl font-bold">₹350</p>
                </div>
              </Card>
              
              <Card className="p-6 bg-secondary text-white shadow-glow animate-scale-in" style={{ animationDelay: "0.3s" }}>
                <div className="text-center">
                  <Calendar className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold">This Week</h3>
                  <p className="text-2xl font-bold">3 Events</p>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-6 shadow-medium animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="gradient-primary text-white p-6 h-auto flex-col space-y-2">
                  <CheckSquare className="w-6 h-6" />
                  <span>Add Chore</span>
                </Button>
                <Button className="gradient-kids text-white p-6 h-auto flex-col space-y-2">
                  <PiggyBank className="w-6 h-6" />
                  <span>Track Money</span>
                </Button>
                <Button className="bg-secondary text-white p-6 h-auto flex-col space-y-2">
                  <Pill className="w-6 h-6" />
                  <span>Add Medicine</span>
                </Button>
                <Button className="bg-accent text-white p-6 h-auto flex-col space-y-2">
                  <Receipt className="w-6 h-6" />
                  <span>Log Expense</span>
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="chores">
            <Card className="p-6 shadow-medium">
              <h3 className="text-2xl font-bold mb-4">Family Chores</h3>
              <p className="text-muted-foreground mb-4">Coming soon - Chore management system</p>
            </Card>
          </TabsContent>

          <TabsContent value="planning">
            <Card className="p-6 shadow-medium">
              <h3 className="text-2xl font-bold mb-4">Family Planning</h3>
              <p className="text-muted-foreground mb-4">Coming soon - Family calendar and planning</p>
            </Card>
          </TabsContent>

          <TabsContent value="money">
            <PocketMoneyTracker />
          </TabsContent>

          <TabsContent value="health">
            <Card className="p-6 shadow-medium">
              <h3 className="text-2xl font-bold mb-4">Health & Medication</h3>
              <p className="text-muted-foreground mb-4">Coming soon - Medication tracker for elderly</p>
            </Card>
          </TabsContent>

          <TabsContent value="expenses">
            <Card className="p-6 shadow-medium">
              <h3 className="text-2xl font-bold mb-4">Family Expenses</h3>
              <p className="text-muted-foreground mb-4">Coming soon - Expense tracker for parents</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
