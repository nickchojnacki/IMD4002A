/*
GUINotes.cs - wirted by ThunderWire Games * Script for Interact Notes
*/

using UnityEngine;
using System.Collections;

public class GUINotes : MonoBehaviour {

public float PickupRange = 3f;

public AudioSource audio1;
public AudioSource audio2;


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

            if (hit.collider.tag == "Picture")
            {
                NoteObject = hit.collider.gameObject;
                if (Input.GetMouseButtonDown(0))
                {
                    audioStop();
                    NoteObject.GetComponent<AudioSource>().Play();
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

    public void audioStop()
    {
       audio1.Stop();
       audio2.Stop();
    }
}