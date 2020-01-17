public with sharing class TriageExpertWidgetController {
    @AuraEnabled
    public static String queryContactData(String accountId)
    {
        System.debug('queryContactData...');

        try {
            List<Contact> conList = [SELECT Birthdate, HealthCloudGA__Gender__c FROM Contact WHERE AccountId = :accountId];
            if (conList == null)
            {
                return null;
            }
            else if (conList != null && conList.size() > 1)
            {
                return null;
            }
            else {
                return JSON.serialize(conList[0]);
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void createNote(String recId, String title, String body)
    {
        System.debug('createNote...');

        try {
            ContentNote cn = new ContentNote();
            cn.Content = Blob.valueOf(body);
            cn.Title = title;
            insert cn;

            ContentDocumentLink clnk = new ContentDocumentLink();
            clnk.LinkedEntityId = recId;
            clnk.ContentDocumentId = cn.Id;
            clnk.ShareType = 'I';
            insert clnk;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}