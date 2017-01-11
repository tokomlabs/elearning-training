<!--AUFunctions.js-->

/*******************************************************************************
**
** Concurrent Technologies Corporation (CTC) grants you ("Licensee") a non-
** exclusive, royalty free, license to use, modify and redistribute this
** software in source and binary code form, provided that i) this copyright
** notice and license appear on all copies of the software; and ii) Licensee
** does not utilize the software in a manner which is disparaging to CTC.
**
** This software is provided "AS IS," without a warranty of any kind.  ALL
** EXPRESS OR IMPLIED CONDITIONS, REPRESENTATIONS AND WARRANTIES, INCLUDING ANY
** IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-
** INFRINGEMENT, ARE HEREBY EXCLUDED.  CTC AND ITS LICENSORS SHALL NOT BE LIABLE
** FOR ANY DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING OR
** DISTRIBUTING THE SOFTWARE OR ITS DERIVATIVES.  IN NO EVENT WILL CTC  OR ITS
** LICENSORS BE LIABLE FOR ANY LOST REVENUE, PROFIT OR DATA, OR FOR DIRECT,
** INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE DAMAGES, HOWEVER
** CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, ARISING OUT OF THE USE OF
** OR INABILITY TO USE SOFTWARE, EVEN IF CTC  HAS BEEN ADVISED OF THE
** POSSIBILITY OF SUCH DAMAGES.
**
*******************************************************************************/
var startDate;
var exitPageStatus;

function loadPage()
{
   LMSInitialize();

   var status = LMSGetValue( "cmi.core.lesson_status" );

   if (status == "not attempted")
   {
	  // the student is now attempting the lesson
	  LMSSetValue( "cmi.core.lesson_status", "incomplete" );
   }

   exitPageStatus = false;
}


function doContinue( status )
{
   // Reinitialize Exit to blank
   LMSSetValue( "cmi.core.exit", "" );

   var mode = LMSGetValue( "cmi.core.lesson_mode" );

   if ( mode != "review"  &&  mode != "browse" )
   {
      LMSSetValue( "cmi.core.lesson_status", status );
   }
 
   exitPageStatus = true;
   
   LMSCommit();

	// NOTE: LMSFinish will unload the current AU.  All processing
	//       relative to the current page must be performed prior
	//		 to calling LMSFinish.   

   LMSFinish();

}

function doQuit()
{
   LMSSetValue( "cmi.core.exit", "logout" );

   exitPageStatus = true;
   
   LMSCommit();

	// NOTE: LMSFinish will unload the current AU.  All processing
	//       relative to the current page must be performed prior
	//		 to calling LMSFinish.   

   LMSFinish();
}


function unloadPage()
{
/*******************************************************************************
** The purpose of this function is to handle cases where the current AU may be 
** unloaded via some user action other than using the navigation controls 
** embedded in the content.   This function will be called every time an AU
** is unloaded.  If the user has caused the page to be unloaded through the
** preferred AU control mechanisms, the value of the "exitPageStatus" var
** will be true so we'll just allow the page to be unloaded.   If the value
** of "exitPageStatus" is false, we know the user caused to the page to be
** unloaded through use of some other mechanism... most likely the back
** button on the browser.  We'll handle this situation the same way we 
** would handle a "quit" - as in the user pressing the AU's quit button.
*******************************************************************************/

	if (exitPageStatus != true)
	{
		doQuit();
	}

	// NOTE:  don't return anything that resembles a javascript
	//		  string from this function or IE will take the
	//		  liberty of displaying a confirm message box.
	
}

