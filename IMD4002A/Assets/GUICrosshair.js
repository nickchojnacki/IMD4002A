/*
GUICrosshair.js version 2.0 - wirted by ThunderWire Games * Script for Reticle with Locked Door
*/
#pragma strict

private var guiShow : boolean = false;

var rayLength = 4;

var m_crosshairTexture : Texture2D;
var m_useTexture : Texture2D;
	 // bools for use reticle or default reticle
var m_DefaultReticle : boolean;
var m_UseReticle : boolean;
	// Rect for crosshair size and position
private  var m_crosshairRect : Rect; 
	// boolean  to turn crosshair on and off
private  var m_bIsCrosshairVisible : boolean= true;
	// boolean to check if door is open 
private var isOpen : boolean;
 
 function Update()
{
	var hit : RaycastHit;
	var fwd = transform.TransformDirection(Vector3.forward);
	
	if(Physics.Raycast(transform.position, fwd, hit, rayLength))
	{
		if(hit.collider.gameObject.tag == "Door")
		{
			var Door : DoorController = hit.collider.gameObject.GetComponent(DoorController);
			
			guiShow = true;
			if(Input.GetKeyDown("e") && isOpen == false)
			{
				Door.Open();
				guiShow = false;
				if(Door.isOpen == true){
					isOpen = true;
				}
			}
			else if(Input.GetKeyDown("e") && isOpen == true)
			{
				Door.Close();
				guiShow = false;
				if(Door.isOpen == false){
					isOpen = false;
				}
			}
		}
		
		if(hit.collider.gameObject.tag == "Key")
		{
			var Key : KeyPickup = hit.collider.gameObject.GetComponent(KeyPickup);			
			guiShow = true;
			if(Input.GetKeyDown("e"))
			{
				Key.Picked();
				guiShow = false;
			}
		}
	}
	else
	{
		guiShow = false;
	}
	
		if(guiShow == true && isOpen == false)
		{
			m_UseReticle = true;
			m_DefaultReticle = false;		
		}
	
		if(guiShow == false && isOpen == true)
		{
			m_UseReticle = false;
			m_DefaultReticle = true;
		}
	
		if(guiShow == true && isOpen == true)
		{
			m_UseReticle = true;
			m_DefaultReticle = false;
		}
	
		if(guiShow == false && isOpen == false)
		{
			m_UseReticle = false;
			m_DefaultReticle = true;			
		}
}
 
	function Awake() {
	    if(m_DefaultReticle){
		  m_crosshairRect = new Rect((Screen.width - m_crosshairTexture.width) / 2, 
								(Screen.height - m_crosshairTexture.height) / 2, 
								m_crosshairTexture.width, 
								m_crosshairTexture.height);
	    }
		
	    if(m_UseReticle){
		  m_crosshairRect = new Rect((Screen.width - m_useTexture.width) / 2, 
								(Screen.height - m_useTexture.height) / 2, 
								m_useTexture.width, 
								m_useTexture.height);
	    }
	}
 
	function OnGUI() {
		if(m_bIsCrosshairVisible)
		  if(m_DefaultReticle){
			GUI.DrawTexture(m_crosshairRect, m_crosshairTexture);
		 }
		  if(m_UseReticle){
			GUI.DrawTexture(m_crosshairRect, m_useTexture);
		 }
	}