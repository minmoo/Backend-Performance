package com.example.performance;

import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import java.io.*;
import org.springframework.beans.factory.annotation.Autowired;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;
import org.springframework.web.bind.annotation.ResponseBody;
import com.example.performance.TestService;
import com.example.performance.TestDto;
import java.util.List;

@RestController
public class PerformanceController{
    @Autowired
    TestService testService;

    @RequestMapping("/")
    public String hello(){
        return "hello world";
    }

    @RequestMapping("/fileTest")
    public String fileTest(){
        long beforeTime = System.currentTimeMillis();

        int count = 100;
        for(int i=0; i < count; i++){
            File file = new File("data/" +i + "file.txt" );
            try{
                BufferedWriter writer = new BufferedWriter(new FileWriter(file));
                for(int j=0; j < count; j++){
                    writer.write(i+" 파일의 " + j + " 번째 줄 입니다.\n");
                }
                writer.close();
            }catch(IOException e){
                e.printStackTrace();
            }
        }

        for(int i=0; i < count; i++){
            File file = new File("data/" +i + "file.txt" );
            try{
                BufferedReader reader = new BufferedReader(new FileReader(file));
                String line;
                while((line = reader.readLine()) != null){}
                reader.close();
            }catch(IOException e){
                e.printStackTrace();
            }
        }

        for(int i=0; i < count; i++){
            File file = new File("data/"+ i + "file.txt");
            file.delete();
        }

        long afterTime = System.currentTimeMillis();
        System.out.println("시간차이(ms) : "+ (double)(afterTime - beforeTime)/1000);
        

        return "success";
    }

    @RequestMapping("/httpTest")
    public String httpTest(){
        long beforeTime = System.currentTimeMillis();
        RestTemplate rest = new RestTemplate();

        String result = rest.getForObject("https://22f3baa6-14d8-403f-959e-476ca9d4376e.mock.pstmn.io/test", String.class);
        
        long afterTime = System.currentTimeMillis();
        System.out.println("시간차이(ms) : "+ (double)(afterTime - beforeTime)/1000);
        return "success";
    }

    @RequestMapping("/dbTest")
    public @ResponseBody String dbTest() throws Exception{
        long beforeTime = System.currentTimeMillis();
        testService.performance();
        long afterTime = System.currentTimeMillis();
      
        System.out.println("시간차이(ms) : "+ (double)(afterTime - beforeTime)/1000);
        
        return "success";
    }
}


