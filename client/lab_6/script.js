let foods = [];

function loadData(jsonUrl, onLoadCallback) {
  window.fetch(jsonUrl).then((res) => res.json()).then((data) => {
    onLoadCallback(data);
  });
}

function storeFoodLocally(data) {
  foods = data.foods;

  fillDropDown(foods);

  // now we can test our searches
  testSearch();
}

function fillDropDown(foods) {
  const select = document.getElementById('foodsDropdown');
  foods.forEach((food) => {
    const option = document.createElement('option');
    option.label = food.name;
    option.value = food.name;

    select.appendChild(option);
  });

  // we select the first record
  select.selectedIndex = 0;

  // we show the band
  showSelectedFoood();
}

function searchWithField() {
  const ul = document.getElementById('foodsFound');
  const field = document.getElementById('searchField');
  const searchString = field.value;
  const foods = search(searchString);

  ul.innerHTML = '';
  foods.forEach((food) => {
    const li = document.createElement('li');
    li.innerText = `${food.name}, length: ${food.length}`;
    ul.appendChild(li);
  });
}

function search(searchString) {
  // we test if searchString is empty in that case we just return the original data
  if (typeof searchString !== 'string' || searchString.length === 0) {
    return foods;
  }

  // we make search string lower case
  const searchLower = searchString.toLowerCase();
  const filtered = foods.filter((food) => {
    if (food.name.toLowerCase().includes(searchLower)) {
      return true;
    }

    if (food.description.toLowerCase().includes(searchLower)) {
      return true;
    }

    return false;
  });

  return filtered;
}
