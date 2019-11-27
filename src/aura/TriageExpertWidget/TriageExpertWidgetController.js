({
    doInit : function(component, event, helper) {
        window.addEventListener("message", function(event) {
            /*
            if (event.origin !== vfOrigin) {
                // Not the expected origin: Reject the message!
                return;
            }
            */
            // Handle the message
            console.log(event.data);
            
            var msg = JSON.parse(event.data);
            var recId = component.get('v.recordId');
            
            if (msg.recordId == recId)
            {
                if (msg.cmd == 'height')
                {
                    document.getElementById("wrapper1").style.height  = (msg.value == 186 ? 100 : msg.value + 120)  + 'px';
                }
                else if (msg.cmd == 'disposition')
                {
                    component.set('v.done', true);
                    document.getElementById("wrapper1").style.height  = '50px';

                    //alert(JSON.stringify(msg.value));
                    this.console.log(JSON.stringify(msg.value));
                    var note = msg.value.triagenote;
                    note = note.replace('"', '');
                    //component.set('v.msg', note);

                    var triageNote = '<p><b>Phone Triage</b></p>';
                    triageNote += '<p>' + new Date() + '<p>';
                    triageNote += '<br>';

                    triageNote += '<p><b>Demographics</b></p>';
                    triageNote += '<p>    ' + msg.value.gender + '</p>';
                    triageNote += '<p>    ' + msg.value.age + '</p>';
                    triageNote += '<br>';

                    triageNote += '<p><b>Results</b></p>';
                    triageNote += '<p>    CC: ' + msg.value.cc + '</p>';
                    triageNote += '<p>    Nurse Recommendation: ' + msg.value.nurserfi + '</p>';
                    triageNote += '<p>    Software Suggestion: ' + msg.value.systemrfi + '</p>';
                    triageNote += '<p>    Nurse Recommended Follow-up Location: ' + msg.value.systemrfl + '</p>';
                    triageNote += '<p>    Sofware Suggested Follow-up Location: ' + msg.value.systemrfl + '</p>';
                    triageNote += '<br>';

                    triageNote += '<p><b>Values and Measures</b></p>';
                    triageNote += '<p>    Duration of CC: ' + msg.value.durationofcomplaint + '</p>';
                    triageNote += '<br>';

                    triageNote += '<p><b>Positive Responses</b></p>';
                    msg.value.positivefindings.forEach(item => triageNote += '<p>    ' + item + '</p>');
                    triageNote += '<br>';

                    triageNote += '<p><b>Negative Responses</b></p>';
                    msg.value.negativefindings.forEach(item => triageNote += '<p>    ' + item + '</p>');

                    component.set('v.msg', triageNote);

                    helper.createDispositionNote(component, recId, 'Triage Disposition', triageNote);
                }
            }
        }, false);

        helper.getContactData(component, component.get('v.recordId'));
  },
    
    handleMessage: function (component, event, helper) {
        console.log('handleMessage...');
        //console.log(JSON.serialize(event));
        //
        /*
        var message = event.getParams().payload;
        console.log(message.height);
        
        var el = document.getElementById("wrapper1");
        el.style.height = message.height + 'px';
        */
   },
    
    handleError: function (component, event, helper) {
        console.log('handleError...');
        var error = event.getParams();
        console.log(error);
    }
})