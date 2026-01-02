import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // Base styles
      "inline-flex items-center justify-center whitespace-nowrap px-3 py-2.5 text-sm font-medium transition-all relative",
      // Focus styles
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      // Disabled styles
      "disabled:pointer-events-none disabled:opacity-50",
      // Active state - Orange underline using box-shadow
      "data-[state=active]:text-[#FC8A06] data-[state=active]:font-semibold",
      "data-[state=active]:shadow-[inset_0_-2px_0_0_#f97316]", // Orange bottom border using box-shadow
      // Inactive state
      "data-[state=inactive]:text-gray-600",
      "data-[state=inactive]:hover:text-gray-900",
      "data-[state=inactive]:hover:shadow-[inset_0_-2px_0_0_#d1d5db]", // Gray bottom border on hover
      "cursor-pointer",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
