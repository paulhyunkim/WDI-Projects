#Angular Filters

Filters in AngularJS are used to format the value of an expression for user view. This can mean tidying up a number or date as a string (for currency or special date formats), changing how a string is displayed, or limiting/ordering the number of items shown.


##Angular filters can…

- be used in view templates (HTML)
- be used in controllers (JS)
- be used in services and directives 

For today: we're looking at some **built-in view template filters**.


##Some brief syntax notes

###View Template Filters
In your view template (the HTML!), you're most likely going to see filters that look something like this:

```{{"rawr" | uppercase}}```

On the left side of the pipe, you'll see the expression. On the right, the filter. (In the sample above, the output is ```RAWR```)

###Controller Filters
In the controller (JS!), things look a little bit different. You're going to encounter filters that look something like this when invoked:

```$scope.totalPrice= $filter('dollar')(totalPrice);```

We'll come back to these later; today we're going to stay in the view template filter realm :)


##Know some common built-in filters

- **filter** -- Yep, there's one called filter. It means "subset of array" and all you need is the **array** and a **predicate** (the string, object, or function that you're limiting your result set with). This returns a new array.
- **currency** -- Working with money? Pop a **$** (or local currency variant) and some **appropriate decimals** onto a **number** with this filter.
- **number**	-- Formats a **number** as **text** (which means you get things like **-**, **commas**, and **decimals**).
- **date** -- Transforms **dates** into **formatted strings**.
- **json** -- Converts **JavaScript objects** into **JSON string** format.
- **lowercase**	-- Converts **string** to **lowercase**.
- **uppercase**	-- Converts **string** to **UPPERCASE**.
- **limitTo**	 -- Caps an **array** or **string** at the specified limit of elements. You can use positive and negative limits to dictate whether these skim off the top or bottom of the set.
- **orderBy** -- Similar to **filter**, but instead of using a **predicate** to exclude, uses it to **order** an array.



