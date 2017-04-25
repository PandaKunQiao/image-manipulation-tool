Shader "final project" { // defines the name of the shader 
    Properties {

    	_MainTex ("Texture Image", 2D) = "white" {} 
        radius ("Radius", Range(-5., 5.)) = 0.
    }
   SubShader { // Unity chooses the subshader that fits the GPU best
      Pass { // some shaders require multiple passes
         GLSLPROGRAM // here begins the part in Unity's GLSL

 
         #ifdef VERTEX // here begins the vertex shader

        uniform sampler2D _MainTex;	
        uniform vec4 _MainTex_ST;   // tiling and offset parameters of property 
        varying vec4 textureCoordinates;
		uniform float x_offset_arr[20];
		uniform float y_offset_arr[20];
		uniform float x_start_arr[20];
		uniform float y_start_arr[20];
		uniform float rotate_offset_arr[20];


		uniform float radius;
		varying vec3 normal, lightDir[3], eyeVec;
		out float black;

		float get_weight (vec4 pos, float x_start, float y_start, float radius)
		{	
			float dist = sqrt(pow(pos.x - x_start, 2) + pow(pos.y - y_start, 2));
			if (dist < radius)
			{
				return (1.0 - (dist/radius));
			}
			else
			{
				return (0.0);
			}
		}

		float get_black (vec4 pos, float x_start, float y_start, float radius)
		{	
			float dist = sqrt(pow(pos.x - x_start, 2) + pow(pos.y - y_start, 2));
			vec4 vert_color;
			if (dist < radius)
			{
				return 1.;
			}
			else
			{
				return 0.;
			}
		}


		vec4 moving_verts (vec4 pos, float x_offset, float y_offset, float weight)
		{
			vec4 new_pos;

			new_pos.x = pos.x + x_offset * weight;
			new_pos.y = pos.y + y_offset * weight;
			new_pos.z = pos.z;
			new_pos.w = pos.w;
			return (new_pos);
		}

		vec4 rotating_verts (vec4 pos, float rotate_offset, 
							 float x_start, float y_start, 
							 float weight)
		{
			vec4 new_pos;
			float radius = sqrt(pow(pos.x - x_start, 2) + pow(pos.y - y_start, 2));
			if (pos.x > x_start && pos.y > y_start)
			{
				new_pos.x = pos.x - sin(rotate_offset) * radius * weight;
				new_pos.y = pos.y - (radius - (cos(rotate_offset) * radius)) * weight;
			}
			else if (pos.x > x_start && pos.y < y_start)
			{
				new_pos.x = pos.x - sin(rotate_offset) * radius * weight;
				new_pos.y = pos.y - (radius - (cos(rotate_offset) * radius)) * weight;
			}
			else if (pos.x < x_start && pos.y < y_start)
			{
				new_pos.x = pos.x - sin(rotate_offset) * radius * weight;
				new_pos.y = pos.y - (radius - (cos(rotate_offset) * radius)) * weight;
			}
			else
			{
				new_pos.x = pos.x - sin(rotate_offset) * radius * weight;
				new_pos.y = pos.y - (radius - (cos(rotate_offset) * radius)) * weight;
			}
			new_pos.z = pos.z;
			new_pos.w = pos.w;
			return (new_pos);
		}



		void main(void)
		{

			//setup
			int index;
			vec4 temp_position = gl_ModelViewMatrix * gl_Vertex;
			float moving_weight;
			vec4 moved_position = temp_position;
			black = 0;
			for (index = 0; index < 20; index++)
			{
				moving_weight = get_weight(temp_position, x_start_arr[index], y_start_arr[index], radius);

				moved_position = moving_verts(moved_position, x_offset_arr[index], y_offset_arr[index], moving_weight);


				if (x_start_arr[index] != 0.0 && y_start_arr[index] != 0.0)
				{
					moved_position = rotating_verts(moved_position, radians(rotate_offset_arr[index]), 
													x_start_arr[index], y_start_arr[index],
													moving_weight);
					//black = black + moving_weight;
				}
			}


			gl_Position = gl_ProjectionMatrix * moved_position;
			textureCoordinates = gl_MultiTexCoord0;
		}
         #endif // here ends the definition of the vertex shader


         #ifdef FRAGMENT // here begins the fragment shader
         //Declare a 2D texture as a uniform variable

		uniform sampler2D _MainTex;
		uniform vec4 _MainTex_ST;   // tiling and offset parameters of property 
		varying vec4 textureCoordinates;
		in float black;

		void main()
		{

   			// textureCoordinates are multiplied with the tiling parameters and the offset parameters are added
   			gl_FragColor = (1.0 - black) * texture2D(_MainTex,  _MainTex_ST.xy * textureCoordinates.xy + _MainTex_ST.zw);	
		}

         #endif // here ends the definition of the fragment shader

         ENDGLSL // here ends the part in GLSL 
      }
   }
}
