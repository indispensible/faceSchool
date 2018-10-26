package com.gang.common;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 *    判断用户是否登录,未登录则退出系统
 */
public class superAdministratorFilter implements Filter {
    private FilterConfig config;

    @Override
    public void destroy() {

    }

    @Override
    public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) arg0;
        HttpServletResponse response = (HttpServletResponse) arg1;
        HttpSession session = request.getSession();

        String noLoginPaths = config.getInitParameter("noLoginPaths");

        String charset = config.getInitParameter("charset");
        if(charset==null){
            charset = "UTF-8";
        }
        request.setCharacterEncoding(charset);

        if(noLoginPaths!=null){
            String[] strArray = noLoginPaths.split(";");
            for (int i = 0; i < strArray.length; i++) {

                if(strArray[i]==null || "".equals(strArray[i])) {continue;}
                int num=0;

                if(request.getRequestURI().indexOf(strArray[i])!=-1 ){
                    arg2.doFilter(arg0, arg1);
                    return;
                }
            }

        }




        if(session.getAttribute("superAdministrator")!=null && session.getAttribute("superAdministrator")!=""){
            arg2.doFilter(arg0, arg1);
        }else{
            response.sendRedirect("/faceSchool/jsp/superAdministrator/login.jsp");
        }

    }

    @Override
    public void init(FilterConfig arg0) throws ServletException {
        config = arg0;
    }
}
