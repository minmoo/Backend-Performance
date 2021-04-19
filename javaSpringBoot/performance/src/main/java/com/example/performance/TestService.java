package com.example.performance;
 
import java.util.List;
 
import com.example.performance.TestDto;
import com.example.performance.mapper.TestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
 
@Service
public class TestService {
 
    @Autowired
    TestMapper testMapper;
    
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