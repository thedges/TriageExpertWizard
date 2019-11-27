# TriageExpertWizard
A Lightning Component show wrapping

THIS SOFTWARE IS COVERED BY [THIS DISCLAIMER](https://raw.githubusercontent.com/thedges/Disclaimer/master/disclaimer.txt).

## Component Details
This is Aura Lightning Component that allows including a Salesforce Maps MiniMap on a page that is not supported out of the box. I found that MiniMaps are just VisualForce pages that I was able to wrap in an iframe and surface within a component. The following image shows a MiniMap (top-right) that was built for a Case record page but the minimap is shown on a LiveChat record page. The component logic grabs the case id from the LiveChat transcript and builds a dynamic URL to load the minimap VisualForce page within iframe. 

![alt text](https://github.com/thedges/TriageExpertWizard/blob/master/TriageExpertWizard.gif "Sample Image")

## Component Configuration

This component currently has no configuration properties.

## Component Install and Setup

To use this component:
1. Install the component using the **'Deploy to Salesforce'** button below.
2. Drag the **TriageExpertWidget** Lightning Component on to your case record page

<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

