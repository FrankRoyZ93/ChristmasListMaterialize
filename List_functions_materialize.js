// origin position of a drag
var dragOrigin;
// element dragged that needs tranfer
var toTransfer;

	// ************************ //
	// **** Grid functions **** //
	// ************************ //
	
function CreateList(_name, _grid, _textInput)
{
	if (_name == "")
	{
		window.alert("Oops! Write something first!");				
	}
	else if (_grid == null || _grid == undefined)
	{
		window.alert("hum... the grid doesn't exist...");
	}
	else
	{
		// reset the "Add" text 
		_textInput.value = "";
		
		// number of lists in the grid
		var nbOfElements = _grid.getElementsByTagName("ul").length;	
		
		// add list in the grid
		_grid.innerHTML +=
		'<div class="col l4 m6 s12">' +
		'	<div class="card-panel">' +
		'		<ul class="collection with-header" id="list' + (nbOfElements + 1) + '">' +
		'			<li class="collection-header">' + 
		'				<div class="row">' +
		'					<div class="col s11">' +
		'						<h4>' + _name + '</h4>' + 
		'					</div>' +
		'					<div class="col s1">' +
		'						<a class="btn-floating red" onclick="RemoveList(list' + (nbOfElements + 1) + ', ' + _grid.id + ')"><i class="material-icons">delete</i></a>' +
		'					</div>' +
		'				</div>' +
		'			</li>' +
		'		</ul>' +
		'		<!-- Add area -->' +
		'		<div class="row">' +
		'			<div class="col s11">' +
		'				<input type="text" id="list' + (nbOfElements + 1) + '_addText" maxlength="25" placeholder="Add new element..." />' +
		'			</div>' +
		'			<div class="col s1">' +
		'				<a class="btn-floating"><i class="material-icons" onclick="AddElement(list' + (nbOfElements + 1) + '_addText.value, list' + (nbOfElements + 1) + ', list' + (nbOfElements + 1) + '_addText)">add</i></a>' +
		'			</div>' +
		'		</div>' +
		'	</div>' +
		'</div>';
	}
}

function RemoveList(_list, _grid)
{
	if (_grid == null || _grid == undefined)
	{
		window.alert("Alert! This list doesn't exist anymore!");		
	}
	else if (_grid == null || _grid == undefined)
	{
		window.alert("hum... the grid doesn't exist...");
	}
	else
	{		
		var lists = _grid.getElementsByTagName("ul");
		
		// We will now check in the grid where '_list' is located		
		for (i = 0; i < lists.length; i++)
		{
			if(lists[i] == _list)
			{
				lists[i].parentNode.parentNode.parentNode.removeChild(lists[i].parentNode.parentNode);
				break;
			}
		}
	}	
}

	// ************************ //
	// **** List functions **** //
	// ************************ //
	
function AddElement(_toAdd, _list, _textInput) 
{
	if (_toAdd == "")
	{
		window.alert("Oops! Write something first!");				
	}
	else if (_list == null || _list == undefined)
	{
		window.alert("hum... the list doesn't exist...");
	}
	else
	{
		// reset the "Add" text 
		_textInput.value = "";

		// number of elements in the list (-1 for the header)
		var nbOfElements = _list.getElementsByTagName("li").length - 1;	
		
		// add element in the list
		_list.innerHTML += 
		'<li class="collection-item" id="' + _list.id + '_element' + (nbOfElements + 1) + '" >' +
		'	<div ondrop="Drop(event, ' + _list.id + '_element' + (nbOfElements + 1) + ', ' + _list.id + ')" ondragover="AllowDrop(event)">' +
		'		<i class="material-icons" draggable="true" ondragstart="Drag(' + _list.id + '_element' + (nbOfElements + 1) + ')">reorder</i>' +
		'		<input type="checkbox" class="filled-in" id="' + _list.id + '_check' + (nbOfElements + 1) + '" value="' + _toAdd + '">' +
		'		<label for="' + _list.id + '_check' + (nbOfElements + 1) +'">' + _toAdd + '</label> ' +
		'		<a href="#!" class="secondary-content" onclick="EraseElement(' + _list.id + '_element' + (nbOfElements + 1) + ', ' + _list.id + ')"><i class="material-icons">delete</i></a>' +
		'	</div>' +
		'</li>';
	}
}

function EraseElement(_toErase, _list)
{
	if (_toErase == null || _toErase == undefined)
	{
		window.alert("Alert! This element doesn't exist anymore!");		
	}
	else if (_list == null || _list == undefined)
	{
		window.alert("hum... the list doesn't exist...");
	}
	else
	{		
		var elements = _list.getElementsByTagName("li");
		
		// We will now check in the list where '_toErase' is located		
		for (i = 0; i < elements.length; i++)
		{
			if(elements[i] == _toErase)
			{
				elements[i].parentNode.removeChild(elements[i]);
				ReorganiseList(_list);
				break;
			}
		}
	}
}

function ReorganiseList(_list)
{
	var elementsNodeList = _list.getElementsByTagName("li");
	
	// Convert elementsNodeList to an array
	var elements = [];
	for(var i = elementsNodeList.length; i--; elements.unshift(elementsNodeList[i]));
	// Remove the first element (the header)
	elements.shift();
	
	for (i = 0; i < elements.length; i++)
	{
		elements[i].id = _list.id + "_element" + (i + 1);
		elements[i].innerHTML =		
		'	<div ondrop="Drop(event, ' + _list.id + '_element' + (i + 1) + ', ' + _list.id + ')" ondragover="AllowDrop(event)">' +
		'		<i class="material-icons" draggable="true" ondragstart="Drag(' + _list.id + '_element' + (i + 1) + ')">reorder</i>' +
		'		<input type="checkbox" class="filled-in" id="' + _list.id + '_check' + (i + 1) + '" value="' + elements[i].getElementsByTagName("input")[0].value + '">' +
		'		<label for="' + _list.id + '_check' + (i + 1) +'">' + elements[i].getElementsByTagName("input")[0].value + '</label> ' +
		'		<a href="#!" class="secondary-content" onclick="EraseElement(' + _list.id + '_element' + (i + 1) + ')"><i class="material-icons">delete</i></a>' +
		'	</div>';
	}
}

function AllowDrop(_ev) 
{
    _ev.preventDefault();
}

function Drag(_element) 
{
	dragOrigin = _element;
	toTransfer = _element.innerHTML;
}

function Drop(_ev, _element, _list) 
{
    _ev.preventDefault();
	
	var destChildren = _element.innerHTML;
	
	_element.innerHTML = toTransfer;
	dragOrigin.innerHTML = destChildren;
	
	ReorganiseList(_list);
}