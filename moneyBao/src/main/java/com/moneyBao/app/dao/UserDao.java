package com.moneyBao.app.dao;

import com.moneyBao.app.domain.UserDto;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Slf4j
@Repository
public class UserDao {

    @Autowired
    DataSource ds;

    @Autowired
    SqlSession session;

    String namespace="com.moneyBao.app.dao.userMapper.";

    /* ******************** 회원가입 (insert) ********************* */
    public int insertUser(UserDto userDto) {
        System.out.println("userDto: " + userDto);
        return session.insert(namespace+"insert" , userDto);
    }

    /* ******************* 아이디 조회 (select) ******************* */
    public UserDto selectUser(UserDto userDto) {
//        String inputId = userDto.getUserId();
        return session.selectOne(namespace + "selectUser", userDto);
    }

    /* *************** 닉네임 중복 조회 (select) ******************* */
    public int userNameChk(String userName) {
        int cnt = session.selectOne(namespace + "userNameChk", userName);
        log.info(String.valueOf(cnt));
        return cnt;
    }

}

