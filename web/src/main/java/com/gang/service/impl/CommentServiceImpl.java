package com.gang.service.impl;

import com.baidu.aip.nlp.AipNlp;
import com.gang.dao.CommentMapper;
import com.gang.pojo.Comment;
import com.gang.service.ICommentService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

/**
 * Created by 吕港 on 2018/3/14.
 */
@Service("ICommentService")
public class CommentServiceImpl implements ICommentService{

    @Autowired
    private CommentMapper commentMapper;

    private static final String APP_ID = "11177554";
    private static final String API_KEY = "yR9K0BCwSYU5UKSTQqIAqaxU";
    private static final String SECRET_KEY = "4yuBLLa9BKaYn2gv6u7NEPVUlfpQVmGt";

    @Override
    public JSONArray getComments(HttpServletRequest request) {
        int CId = Integer.parseInt(request.getParameter("CId").trim());
//        int CId = 2;
        List<Comment> comments = commentMapper.selectByCId(CId);
        if(comments == null){
            String msg = "{'status':1}";
            JSONArray judge = new JSONArray(msg);
            return judge;
        }else{
            JSONArray judge = new JSONArray(comments);
            return judge;
        }
    }

    @Override
    public JSONArray getCommentsBytest(HttpServletRequest request) {
        int CId = 0;
        List<Comment> comments = commentMapper.selectByCId(CId);
        JSONArray judge;
        if(comments == null){
            String msg = "{'status':1}";
            judge = new JSONArray(msg);
        }else{
            judge = new JSONArray(comments);
        }
        return judge;
    }

    @Override
    public JSONObject getCommentsByCommentId(HttpServletRequest request) {
        int commentId = Integer.parseInt(request.getParameter("commentId"));
        Comment judge = commentMapper.selectByPrimaryKey(commentId);
        String msg = "";
        if( judge != null){
            JSONObject jsonObject = new JSONObject(judge);
            return jsonObject;
        }else{
            JSONObject jsonObject = new JSONObject(msg);
            return jsonObject;
        }

    }

    @Override
    public JSONArray getCommentsByApplaud(HttpServletRequest request) {
        int CId = Integer.parseInt(request.getParameter("CId"));
        int applaud = Integer.parseInt(request.getParameter("applaud"));
        List<Comment> commentsApplaud = commentMapper.selectByapplaud(applaud);
        JSONArray judge;
        if(commentsApplaud == null){
            String msg1 = "{'status':1}";
            judge = new JSONArray(msg1);
        }else{
            judge = new JSONArray(commentsApplaud);
        }
        return judge;
    }

    @Override
    public JSONObject createComments(HttpServletRequest request) {
        int CId = Integer.parseInt(request.getParameter("CId"));
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String comment = request.getParameter("comment");
        int applaud = Integer.parseInt(request.getParameter("applaud"));
        int ifDelete = Integer.parseInt(request.getParameter("ifDelete"));
        AipNlp client = new AipNlp(APP_ID, API_KEY, SECRET_KEY);
        JSONObject res = client.sentimentClassify(comment);
        JSONArray analysis = res.getJSONArray("items");
        String positive = "";
        String sentiment = "";
        for (int i = 0; i < analysis.length(); i++) {
            JSONObject jo = analysis.getJSONObject(i);
            positive = String.valueOf(jo.getDouble("positive_prob"));
            sentiment = String.valueOf(jo.getInt("sentiment"));
        }
        Date time = new Date();
        Comment comment1 = new Comment(CId, name, email, ifDelete, time, applaud, comment, positive, sentiment, "test");
        int comments = commentMapper.insertSelective(comment1);
        String msg = "";
        if(comments >= 1){
            msg = "{'status':1}";
        }else{
            msg = "{'status':2}";
        }
        JSONObject judge = new JSONObject(msg);
        return judge;
    }

    @Override
    public JSONObject deleteComments(HttpServletRequest request) {
        int commentId = Integer.parseInt(request.getParameter("commentId"));
        int num = commentMapper.deleteByPrimaryKey(commentId);
        String msg = "";
        if( num >= 1){
            msg = "{'status':1}";
        }else{
            msg = "{'status':2}";
        }
        JSONObject judge = new JSONObject(msg);
        return judge;
    }

}
