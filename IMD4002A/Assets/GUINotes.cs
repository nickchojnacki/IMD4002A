/*
GUINotes.cs - wirted by ThunderWire Games * Script for Interact Notes
*/

using UnityEngine;
using System.Collections;

public class GUINotes : MonoBehaviour {

public float PickupRange = 3f;

private bool backNotes = false;

private Ray playerAim;
private Camera playerCam;
private GameObject NoteObject;
	
	void Update () {
		playerCam = Camera.main;
		Ray playerAim = playerCam.GetComponent<Camera>().ViewportPointToRay(new Vector3(0.5f, 0.5f, 0));
		RaycastHit hit;

		if (Physics.Raycast (playerAim, out hit, PickupRange)){
			if (hit.collider.tag == "Interact"){
				NoteObject = hit.collider.gameObject;
				if(Input.GetMouseButtonDown(0))
                {
					NoteObject.GetComponent<Notes>().ShowNotes();
					backNotes = false;
				}
			}
		}
		if(backNotes){
			NoteObject.GetComponent<Notes>().BackNotes();
			backNotes = false;
		}
    }
	
	public void Back() {
		backNotes = true;
	}
}