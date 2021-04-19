package com.example.performance;

public class TestDto{
    private String cbotTokenId;
    private String cbotTokenCntt;
    private String cbotEntyGrpId;

    public String getCbotTokenId(){
        return this.cbotTokenId;
    }

    public void setCbotTokenId(String cbotTokenId){
        this.cbotTokenId = cbotTokenId;
    }

    public String getCbotTokenCntt(){
        return this.cbotTokenCntt;
    }

    public void setCbotTokenCntt(String cbotTokenCntt){
        this.cbotTokenCntt = cbotTokenCntt;
    }

    public String getCbotEntyGrpId(){
        return this.cbotEntyGrpId;
    }

    public void setCbotEntyGrpId(String cbotEntyGrpId){
        this.cbotEntyGrpId = cbotEntyGrpId;
    }
}