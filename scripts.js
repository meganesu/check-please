function addName() {
  // Take the value from the "new-name" input box
  var newName = document.getElementById("new-name").value;
  document.getElementById("new-name").value = "";

  if (newName != "") {

    // What ID is this name? (What index in the array?)
    var nameId = names.length;

    // Create a new list item to namesList
    var namesList = document.getElementById("names-list");
    var li = document.createElement("li");
    li.id = "name-" + nameId;
    li.appendChild(document.createTextNode(newName));
    // Create a remove button for the name
    var removebtn = document.createElement("button");
    removebtn.id = "remove-" + nameId;
    removebtn.appendChild(document.createTextNode("Remove"));
    removebtn.addEventListener("click", removeName);
    li.appendChild(removebtn);
    // Add list item to namesList
    namesList.appendChild(li);

    // Add a new checkbox to tabsList
    // Format: <label><input/>Label Text</label>
    var tabsList = document.getElementById("tabs-list");
    var label = document.createElement("label");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox-" + nameId;
    checkbox.name = "whose-tab";
    checkbox.value = nameId;
    var description = document.createTextNode(newName);

    label.appendChild(checkbox);
    label.appendChild(description);
    label.appendChild(document.createElement("br"));

    tabsList.appendChild(label);

    // Add new name to global array of names
    names.push(newName);
    console.log(names);
  }
}

function removeName() {
  console.log("remove name");
}

function addItem() {
  // Create and initialize a new item object
  var item = {};
  item.itemId = items.length;
  item.price = document.getElementById("input-price").value;
  item.description = document.getElementById("input-description").value;
  item.whoseTabs = [];

  var checkboxes = document.getElementsByName("whose-tab");
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      item.whoseTabs.push(Number(checkboxes[i].value));
    }
  }

  if (item.whoseTabs.length != 0) {
    // Only add item to list if it's on someone's tab

    var itemsList = document.getElementById("items-list");
    var li = document.createElement("li");
    li.id = "item-" + item.itemId;
    var liText = "$" + item.price + ", " + item.description 
                     + ", " + item.whoseTabs;
    li.appendChild(document.createTextNode(liText));

    var removebtn = document.createElement("button");
    removebtn.id = "remove-" + item.itemId;
    removebtn.appendChild(document.createTextNode("Remove"));
    removebtn.addEventListener("click", removeItem);
    li.appendChild(removebtn);

    itemsList.appendChild(li);

    items.push(item);
    console.log(items);

    // Clear the item inputs
    document.getElementById("input-price").value = "";
    document.getElementById("input-description").value = "";
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  }
}

function removeItem() {
  console.log("remove item");
}

function calcTaxRate() {
  var subtotal = document.getElementById("input-subtotal").value;
  var tax = document.getElementById("input-tax").value;
  var rate = tax/subtotal;
  taxRate = rate;
  console.log("rate: " + rate);
}

function calcTabs() {
  console.log("calculate tabs");
  // Use (Number).toFixed(2) to display strings with 2 decimal places
  var totalsList = document.getElementById("totals-list");

  // for each person in names
  //    for each item in items
  //        if names[i] is in item[j].whoseTabs
  //            add item[j].price / item[j].whoseTabs.length to subtotal
  //    print subtotal.toFixed()
  for (var i = 0; i < names.length; i++) {
    var subtotal = 0;
    for (var j = 0; j < items.length; j++) {
      if (containsValue(items[j].whoseTabs, i)) {
        subtotal += Number(items[j].price) / items[j].whoseTabs.length;
      }
    }
    console.log(names[i] + ": $" + subtotal.toFixed(2));
    tabSubtotals[i] = subtotal;
  }
  // Calculate with tax

  // Create list items for each tab
  // Clear any existing list items in tabsList
  while (totalsList.hasChildNodes()) {
    totalsList.removeChild(totalsList.lastChild);
  }
  for (var i = 0; i < tabSubtotals.length; i++) {
    tabSubtotals[i] = (tabSubtotals[i] * (1 + taxRate)).toFixed(2);
    var li = document.createElement("li");
    li.id = "tab-" + i;
    var text = names[i] + ": $" + tabSubtotals[i];
    li.appendChild(document.createTextNode(text));
    totalsList.appendChild(li);
  }

}

function containsValue(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (Number(array[i]) == Number(value)) {
      return true;
    }
  }
  return false;
}