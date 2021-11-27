# Data normalization

It's better to avoid complex state that contains deep nesting and normalize data.
This has many benefits:
- We get a more flat structure, meaning that we are not dealing with deep nesting as much.
- Our data structure consists primarily of objects that have their own id. Relationships are being created with id.
- We avoid data duplication.

With normalized data we can easily obtain a data structure like that:

```
{
	posts: {
		byId: {
			"1": {
				id: "1",
				name: "name 1",
				body: "Lorem ipsum . . .",
				comments: ["11"],
				author: "Joe Doe",
				data: "2020-10-20"
			},
			"2": {
				id: "2",
				name: "name 2",
				body: "Lorem ipsum . . .",
				comments: ["12". "13", "14"],
				author: "Marry Doe",
				data: "2020-10-20"
			},
			...
		},
		allIds: ["1", "2"]
	},
	comments: {
		byId: {
			"11": {id: "11", comment: "Lorem comment . . ." },
			"12": {id: "12", comment: "Lorem comment . . ." },
			"13": {id: "13", comment: "Lorem comment . . ." },
	 	    "14": {id: "14", comment: "Lorem comment . . ." }
		}.
		allIds: ["11", "12", "13", "14"]
	}
}
```