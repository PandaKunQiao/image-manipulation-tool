#pragma strict
public var is_draging = false;
private var radius: float;
private var main_handle: Transform;



function Start () 
{
	radius = transform.position.y - transform.parent.position.y;
	main_handle = transform.parent;
}

function Update () 
{
	if (handle_prefab.is_moving_handle)
	{
		//if mouse is dragging
		if (is_draging == true)
		{
			var handle_position = Input.mousePosition;
			handle_position.z = 5;
			handle_position = Camera.main.ScreenToWorldPoint(handle_position);
			var handle_angle = Mathf.Atan((handle_position.y - main_handle.transform.position.y)/(handle_position.x - main_handle.transform.position.x));

			if (handle_position.x > main_handle.position.x)
			{
				transform.position.x = main_handle.transform.position.x + radius * Mathf.Cos(handle_angle);
				transform.position.y = main_handle.transform.position.y + radius * Mathf.Sin(handle_angle);
			}
			else
			{
				transform.position.x = main_handle.transform.position.x - radius * Mathf.Cos(handle_angle);
				transform.position.y = main_handle.transform.position.y - radius * Mathf.Sin(handle_angle);
			}
		}
	}
		
}

// if the handle is dragged
function OnMouseDrag ()
{
	is_draging = true;

}

// if the handle is not dragged
function OnMouseUp ()
{
	is_draging = false;
}
