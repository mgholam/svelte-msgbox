# Svelte-msgbox

A message box component for `svelte`.  

- You can move the message box by dragging the title around.
- Input boxes can be resized by dragging the gray box at the bottom right corner.



## How to use the component

```javascript
// import the javascript interface
import msgbox from "./msgbox.js";

// ok message box
msgbox.Ok("some message about something", "Alert");

// Yes/No message box
msgbox.YesNo("Do you realy want to do this?", "Do it?", 
  () => { console.log("doing yes");}
);

// Ok/Cancel message box
msgbox.OkCancel("Is this Ok?", "Confirm", 
  () => { console.log("doing ok");}
);

// single line input box 
msgbox.Input(
 "initial value",
 "Enter a string",
 "place holder message",
 false,
 val => { console.log(val);}
);

// multi line textbox input
msgbox.Input(
 "initial value",
 "Enter something",
 "place holder message",
 true,
 val => { console.log(val);}
);
```




