public var handle: GameObject;



private var startRotation: Quaternion;
private var handle_position: Vector4;
private var handle_index = 0;
static var is_moving_handle = false;

//helper function to create handle
function create_handle(index): GameObject
{
	var handle_instance: GameObject = Instantiate(handle, handle_position, startRotation);

    //Decide which part of image taht handle is controlling
    handle_script = handle_instance.GetComponent.<handle>();
    handle_script.handle_index = index;
    return (handle_instance);
}

// Use this for initialization
function Start()
{
	Debug.Log(Mathf.Rad2Deg * Mathf.Atan(3));
	Debug.Log(Mathf.Rad2Deg * Mathf.Atan(1));
	Debug.Log(Mathf.Rad2Deg * Mathf.Atan(0.5));
	Debug.Log(Mathf.Rad2Deg * Mathf.Atan(0));
	Debug.Log(Mathf.Rad2Deg * Mathf.Atan(-1));
	Debug.Log(Mathf.Rad2Deg * Mathf.Atan(-3));
	var board = GameObject.Find("board");
	var board_rend = board.GetComponent.<Renderer>();
	board_rend.material.SetFloatArray("x_start_arr", [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
	board_rend.material.SetFloatArray("y_start_arr", [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
	board_rend.material.SetFloatArray("x_offset_arr", [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
	board_rend.material.SetFloatArray("y_offset_arr", [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
	board_rend.material.SetFloatArray("rotate_offset_arr", [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);

}
 

function Update()
{
	if (Input.GetKeyDown("space"))
	{
		is_moving_handle = !is_moving_handle;
	}
	if (!is_moving_handle)
	{
		if (Input.GetMouseButtonDown(0))
	    {
	    	//Get initial position of handle from mouse position
	        handle_position = Input.mousePosition;
	        handle_position.z = 5;
	        handle_position = Camera.main.ScreenToWorldPoint(handle_position);

	        //Instantiate handle
	        var newhandle: GameObject = create_handle(handle_index);
	        handle_index = handle_index + 1;

	    }
	}
	var i: int;
	var board = GameObject.Find("board");
	var board_rend = board.GetComponent.<Renderer>();
	var a = board_rend.material.GetFloatArray("x_offset_arr");
	var b = board_rend.material.GetFloatArray("y_offset_arr");
	var c = board_rend.material.GetFloatArray("rotate_offset_arr");
	if (Input.GetKeyDown("k"))
	{
		for (i = 0; i < 20; i++)
		{
			Debug.Log(a[i].ToString("C"));
			Debug.Log(b[i].ToString("C"));
			Debug.Log(c[i].ToString("C"));
		}

	}
}


