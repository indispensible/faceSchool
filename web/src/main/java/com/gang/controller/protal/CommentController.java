package com.gang.controller.protal;

import com.gang.service.impl.CommentServiceImpl;
import com.hankcs.hanlp.HanLP;
import com.hankcs.hanlp.seg.common.Term;
import com.hankcs.hanlp.tokenizer.NLPTokenizer;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by 吕港 on 2018/3/14.
 */
@Controller
@RequestMapping("/comment/")
public class CommentController {
    @Resource(name = "ICommentService")
    private CommentServiceImpl commentService;

    @RequestMapping(value="commentsByCId.do",method= RequestMethod.POST)
    public void commentsByCId(HttpServletRequest request, HttpServletResponse response) throws IOException{
        PrintWriter out = response.getWriter();
        JSONArray judge = commentService.getComments(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value="commentsByApplaud.do",method= RequestMethod.POST)
    public void commentsByApplaud(HttpServletRequest request, HttpServletResponse response) throws IOException{
        PrintWriter out = response.getWriter();
        JSONArray judge = commentService.getCommentsByApplaud(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value="commentsCreate.do",method= RequestMethod.POST)
    public void commentsCreate(HttpServletRequest request, HttpServletResponse response) throws IOException{
        PrintWriter out = response.getWriter();
        JSONObject judge = commentService.createComments(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value="commentsByCommentId.do",method= RequestMethod.POST)
    public void commentsByCommentId(HttpServletRequest request, HttpServletResponse response) throws IOException{
        PrintWriter out = response.getWriter();
        JSONObject judge = commentService.getCommentsByCommentId(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value="deleteComments.do",method= RequestMethod.POST)
    public void deleteComments(HttpServletRequest request, HttpServletResponse response) throws IOException{
        PrintWriter out = response.getWriter();
        JSONObject judge = commentService.deleteComments(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value="commentsMiningByCId.do",method= RequestMethod.POST)
    public void commentsMiningByCId(HttpServletRequest request, HttpServletResponse response) throws IOException{
        PrintWriter out = response.getWriter();
        int type = Integer.parseInt(request.getParameter("type"));
        JSONArray judge = commentService.getComments(request);
        JSONArray judge1 = commentService.getCommentsBytest(request);
        List lists = new ArrayList();
        List lists1 = judge.toList();
        List lists2 = judge1.toList();
        int length1 = lists1.size();
        int length2 = lists2.size();
        if( length1 >= length2){
            for(int i = 0; i < length2; i++){
                lists.add(lists1.get(i));
                lists.add(lists2.get(i));
            }
            for(int j = 0; j < (length1 - length2); j++){
                lists.add(lists1.get(length2 + j));
            }
        }else{
            for(int i = 0; i < length1; i++){
                lists.add(lists1.get(i));
                lists.add(lists2.get(i));
            }
            for(int j = 0; j < (length2 - length1); j++){
                lists.add(lists2.get(length1 + j));
            }
        }

        int length = lists.size();
        String comments = "";
        String test = "";
        if(length >= 66){
            for(int i = 1; i <= 66; i++){
                test = lists.get(length - i).toString().split(",")[4];
                comments = comments + test;
            }
        }else{
            for(int i = 0; i < length; i++){
                test = lists.get(i).toString().split(",")[5].split("=")[1];
                comments = comments + test;
            }
        }
        List<String> keywordList = new ArrayList<String>();
        if(type == 1){
            keywordList = HanLP.extractKeyword(comments, 128);
            for (int num = 0; num < keywordList.size(); num=num){
                if(keywordList.get(num).contains("老师") || keywordList.get(num).contains("嘻") || keywordList.get(num).contains("哈") || keywordList.get(num).contains("啦") || keywordList.get(num).contains("感觉") || keywordList.get(num).contains("中的") || keywordList.get(num).contains("问我")){
                    keywordList.remove(num);
                }else{
                    num++;
                }
            }
        }else if(type == 2){
            keywordList = HanLP.extractPhrase(comments, 128);
            for (int num = 0; num < keywordList.size(); num=num){
                if(keywordList.get(num).contains("老师") || keywordList.get(num).contains("嘻") || keywordList.get(num).contains("哈") || keywordList.get(num).contains("啦") || keywordList.get(num).contains("感觉") || keywordList.get(num).contains("中的") || keywordList.get(num).contains("问我") || keywordList.get(num).contains("拐点")){
                    keywordList.remove(num);
                }else{
                    num++;
                }
            }
        }else{
            keywordList = HanLP.extractSummary(comments, 128);
            for (int num = 0; num < keywordList.size(); num=num){
                if(keywordList.get(num).contains("问我") || keywordList.get(num).contains("嘻嘻")){
                    keywordList.remove(num);
                }else{
                    num++;
                }
            }
        }
//        System.out.println(keywordList);
        out.print(keywordList);
        out.flush();
    }

}
