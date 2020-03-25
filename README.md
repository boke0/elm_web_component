Elm Web Components
===
Web Components wrapper which is inspired by the Elm Architecture.

```JavaScript
import component from "elm_web_component"
component("cmp-test", {
  attrs: ["name", "description"]
  init(name, description){
    this.name = name;
    this.description = description;
  },
  ponpon(){
    this.description+="にゃー";
  },
  template(){
    return `
      <h2>${this.name}</h2>
      <p upd-click="ponpon">${this.description}</p>
    `;
  }
});
```

```HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Test</title>
</head>
<body>
  <cmp-test data-name="わん" data-description="にゃー"></cmp-test>
</body>
</html>
```
