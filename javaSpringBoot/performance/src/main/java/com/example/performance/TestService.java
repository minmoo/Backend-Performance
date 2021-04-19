package com.example.performance;
 
import java.util.List;
 
import com.example.performance.TestDto;
import com.example.performance.mapper.TestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
 
@Service
@Transactional
public class TestService {
 
    @Autowired
    TestMapper testMapper;

    public void performance() throws Exception{
        int count = 10;
        for(int i=0; i < count; i++ ){
            TestDto param = new TestDto();
            param.setCbotTokenId("id" + i);
            param.setCbotTokenCntt("cntt" + i);
            param.setCbotEntyGrpId("test");
            insertTest(param);
        }
        
        List<TestDto> allList = getAll();
        System.out.println(allList.size());

        deleteTest();

    }
    
    public List<TestDto> getAll() throws Exception{
        return testMapper.getAll();
    }

    public void insertTest(TestDto param) throws Exception{
        testMapper.insertTest(param);
    }

    public void deleteTest() throws Exception{
        testMapper.deleteTest();
    }
}