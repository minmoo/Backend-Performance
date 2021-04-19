package com.example.performance.mapper;
 
import java.util.List;
 
import com.example.performance.TestDto;
import org.springframework.stereotype.Repository;

 
@Repository
public interface TestMapper {
 
    public List<TestDto> getAll() throws Exception;

    public void insertTest(TestDto param) throws Exception;

    public void deleteTest() throws Exception;
    
}
 