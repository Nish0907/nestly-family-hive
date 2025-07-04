import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PiggyBank, Plus, TrendingUp, Gift, Coins, Target } from "lucide-react";

interface Transaction {
  id: string;
  childName: string;
  amount: number;
  type: "earned" | "spent" | "saved";
  description: string;
  date: string;
}

interface Child {
  name: string;
  balance: number;
  savings: number;
  totalEarned: number;
}

export const PocketMoneyTracker = () => {
  const [children, setChildren] = useState<Child[]>([
    { name: "Aarav", balance: 150, savings: 200, totalEarned: 500 },
    { name: "Priya", balance: 85, savings: 150, totalEarned: 350 }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      childName: "Aarav",
      amount: 25,
      type: "earned",
      description: "Completed weekly chores",
      date: "Today"
    },
    {
      id: "2",
      childName: "Priya",
      amount: 15,
      type: "spent",
      description: "Bought ice cream",
      date: "Yesterday"
    }
  ]);

  const [newTransaction, setNewTransaction] = useState<{
    childName: string;
    amount: number;
    type: "earned" | "spent" | "saved";
    description: string;
  }>({
    childName: "Aarav",
    amount: 0,
    type: "earned",
    description: ""
  });

  const addTransaction = () => {
    if (newTransaction.amount > 0 && newTransaction.description) {
      const transaction: Transaction = {
        id: Date.now().toString(),
        childName: newTransaction.childName,
        amount: newTransaction.amount,
        type: newTransaction.type,
        description: newTransaction.description,
        date: "Today"
      };
      
      setTransactions([transaction, ...transactions]);
      
      // Update child's balance - Fixed TypeScript error
      setChildren(children.map(child => {
        if (child.name === newTransaction.childName) {
          let balanceChange = 0;
          let earnedAmount = 0;
          
          if (newTransaction.type === "spent") {
            balanceChange = -newTransaction.amount;
          } else {
            balanceChange = newTransaction.amount;
          }
          
          if (newTransaction.type === "earned") {
            earnedAmount = newTransaction.amount;
          }
          
          return {
            ...child,
            balance: child.balance + balanceChange,
            totalEarned: child.totalEarned + earnedAmount
          };
        }
        return child;
      }));
      
      setNewTransaction({ childName: "Aarav", amount: 0, type: "earned", description: "" });
    }
  };

  const transferToSavings = (childName: string, amount: number) => {
    setChildren(children.map(child => {
      if (child.name === childName && child.balance >= amount) {
        return {
          ...child,
          balance: child.balance - amount,
          savings: child.savings + amount
        };
      }
      return child;
    }));
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "earned": return "text-accent-kids bg-accent-kids/10";
      case "spent": return "text-destructive bg-destructive/10";
      case "saved": return "text-primary bg-primary/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 gradient-kids shadow-medium animate-slide-up">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-2 flex items-center justify-center">
            <PiggyBank className="w-8 h-8 mr-3" />
            Pocket Money Tracker
          </h2>
          <p className="text-lg opacity-90">
            Track earnings, spending, and savings for the kids! 💰
          </p>
        </div>
      </Card>

      {/* Kids' Balances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children.map((child, index) => (
          <Card 
            key={child.name} 
            className="p-6 shadow-medium hover:shadow-glow transition-smooth animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-center mb-4">
              <div className="gradient-kids w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-white">
                  {child.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground">{child.name}</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-accent-kids/10 rounded-lg">
                <div className="flex items-center">
                  <Coins className="w-5 h-5 mr-2 text-accent-kids" />
                  <span className="font-medium">Balance</span>
                </div>
                <span className="text-xl font-bold text-accent-kids">₹{child.balance}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center">
                  <PiggyBank className="w-5 h-5 mr-2 text-primary" />
                  <span className="font-medium">Savings</span>
                </div>
                <span className="text-xl font-bold text-primary">₹{child.savings}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg">
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-secondary" />
                  <span className="font-medium">Total Earned</span>
                </div>
                <span className="text-xl font-bold text-secondary">₹{child.totalEarned}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <Button 
                size="sm" 
                className="w-full gradient-primary text-white"
                onClick={() => transferToSavings(child.name, 50)}
                disabled={child.balance < 50}
              >
                Save ₹50
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Transaction */}
      <Card className="p-6 shadow-medium animate-scale-in">
        <h3 className="text-xl font-semibold mb-4 text-foreground">Add Transaction</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <select
            value={newTransaction.childName}
            onChange={(e) => setNewTransaction({ ...newTransaction, childName: e.target.value })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {children.map(child => (
              <option key={child.name} value={child.name}>{child.name}</option>
            ))}
          </select>
          
          <select
            value={newTransaction.type}
            onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as any })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="earned">Earned</option>
            <option value="spent">Spent</option>
            <option value="saved">Saved</option>
          </select>
          
          <Input
            type="number"
            placeholder="Amount"
            value={newTransaction.amount || ""}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseInt(e.target.value) || 0 })}
          />
          
          <Input
            placeholder="Description"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
          />
          
          <Button onClick={addTransaction} className="gradient-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-6 shadow-medium animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <h3 className="text-xl font-semibold mb-4 text-foreground">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-card rounded-lg shadow-card hover:shadow-medium transition-smooth"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-4">
                <div className="gradient-kids w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {transaction.childName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">{transaction.childName} • {transaction.date}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Badge className={getTransactionColor(transaction.type)}>
                  {transaction.type}
                </Badge>
                <span className={`text-lg font-bold ${
                  transaction.type === "earned" ? "text-accent-kids" : 
                  transaction.type === "spent" ? "text-destructive" : "text-primary"
                }`}>
                  {transaction.type === "spent" ? "-" : "+"}₹{transaction.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Savings Goals */}
      <Card className="p-6 shadow-medium animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <h3 className="text-xl font-semibold mb-4 flex items-center text-foreground">
          <Target className="w-5 h-5 mr-2 text-primary" />
          Savings Goals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-accent-kids/10 rounded-lg p-4 text-center">
            <Gift className="w-8 h-8 mx-auto mb-2 text-accent-kids" />
            <p className="font-semibold">New Bicycle</p>
            <p className="text-sm text-muted-foreground">Goal: ₹5000</p>
            <div className="mt-2 bg-accent-kids/20 rounded-full h-2">
              <div className="bg-accent-kids h-2 rounded-full w-1/3"></div>
            </div>
          </div>
          
          <div className="bg-primary/10 rounded-lg p-4 text-center">
            <Gift className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="font-semibold">Gaming Console</p>
            <p className="text-sm text-muted-foreground">Goal: ₹15000</p>
            <div className="mt-2 bg-primary/20 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-1/5"></div>
            </div>
          </div>
          
          <div className="bg-secondary/10 rounded-lg p-4 text-center">
            <Gift className="w-8 h-8 mx-auto mb-2 text-secondary" />
            <p className="font-semibold">Art Supplies</p>
            <p className="text-sm text-muted-foreground">Goal: ₹2000</p>
            <div className="mt-2 bg-secondary/20 rounded-full h-2">
              <div className="bg-secondary h-2 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};