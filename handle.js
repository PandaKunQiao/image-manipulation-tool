private var startRotation: Quaternion;
private var handle_instance;
private var is_draging;
private var initial_x: float;
private var initial_y: float;
private var x_start_arr: float[];
private var y_start_arr: float[];

public var handle_index: int;

// rotation handle is the child of handle
private var rotation_handle: Transform;
private var rotation_handle_script;
public var rotation_radius: float;


function get_angle (x, y): float
{
	if (x == 0.0)
	{
		if (y > 0.0)
		{
			return 0.0;
		}
		else
		{
			return 180.0;
		}
	}
	else
	{
		if (x > 0.0 && y > 0.0)
		{
			return (-(90 - (Mathf.Rad2Deg * Mathf.Atan(y/x))));
		}
		else if (y < 0.0 && x > 0.0)
		{
			return (270 + Mathf.Rad2Deg * Mathf.Atan(y/x));
		}
		else if (y < 0.0 && x < 0.0)
		{
			return (-270 + Mathf.Rad2Deg * Mathf.Atan(y/x));
		}
		else
		{
			return (-270 + Mathf.Rad2Deg * Mathf.Atan(y/x));
		}
	}
	
}

function Start () 
{
	var board = GameObject.Find("board");
	var board_rend = board.GetComponent.<Renderer>();
	rotation_handle = transform.Find("rotation_handle");
	rotation_handle_script = gameObject.GetComponentInChildren.<rotation_handle_script>();
	initial_x = transform.position.x;
	initial_y = transform.position.y;
	x_start_arr = board_rend.material.GetFloatArray("x_start_arr");
	y_start_arr = board_rend.material.GetFloatArray("y_start_arr");
	//x_offset_arr = board_rend.material.GetFloatArray("x_offset_arr");
	//y_offset_arr = board_rend.material.GetFloatArray("y_offset_arr");
	rotate_offset_arr = board_rend.material.GetFloatArray("rotate_offset_arr");
}

function Update () 
{
	//get the board
	var board = GameObject.Find("board");
	var board_rend = board.GetComponent.<Renderer>();

	//pass the initial position of handle to the shader
	x_start_arr[handle_index] = initial_x;
	y_start_arr[handle_index] = initial_y;
	board_rend.material.SetFloatArray("x_start_arr", x_start_arr);
	board_rend.material.SetFloatArray("y_start_arr", y_start_arr);
	transform.rotation.eulerAngles.z = get_angle(rotation_handle.position.x - transform.position.x, rotation_handle.position.y - transform.position.y);
	var temp_eulerAngles = transform.rotation.eulerAngles.z;

	// if in moving mode
	if (handle_prefab.is_moving_handle)
	{
		//if mouse is dragging
		if (is_draging == true)
		{
			var handle_position = Input.mousePosition;
			handle_position.z = 5;
			transform.position = Camera.main.ScreenToWorldPoint(handle_position);

			//read the position array in shader
			var x_offset_arr = board_rend.material.GetFloatArray("x_offset_arr");
			var y_offset_arr = board_rend.material.GetFloatArray("y_offset_arr");

			// Appply value to the array
			x_offset_arr[handle_index] = transform.position.x - initial_x;
			y_offset_arr[handle_index] = transform.position.y - initial_y;

			//help to debug
			//Debug.Log(x_offset_arr[handle_index].ToString("C"));
			//Debug.Log("y" + y_offset_arr[handle_index].ToString("C"));
			//Debug.Log(rotation_handle.position.y.ToString("C"));

			//Debug.Log("r" + rotate_offset_arr[handle_index].ToString("C"));

			// pass the real time position to shader
			board_rend.material.SetFloatArray("x_offset_arr", x_offset_arr);
			board_rend.material.SetFloatArray("y_offset_arr", y_offset_arr);

		}

		if (rotation_handle_script.is_draging == true)
		{
			var rotate_offset_arr = board_rend.material.GetFloatArray("rotate_offset_arr");
			rotate_offset_arr[handle_index] = temp_eulerAngles;
			board_rend.material.SetFloatArray("rotate_offset_arr", rotate_offset_arr);
		}
	}

	// helper code function to debug
	if (Input.GetKeyDown("j"))
	{
	var i;
	var a = board_rend.material.GetFloatArray("x_offset_arr");
	var b = board_rend.material.GetFloatArray("y_offset_arr");
	var c = board_rend.material.GetFloatArray("rotate_offset_arr");
		for (i = 0; i < 20; i++)
		{
			Debug.Log(a[handle_index].ToString("C"));
			Debug.Log(b[handle_index].ToString("C"));
			Debug.Log(c[handle_index].ToString("C"));
		}

	}
	// end of debugging code


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

