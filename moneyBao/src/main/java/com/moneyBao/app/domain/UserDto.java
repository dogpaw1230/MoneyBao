package com.moneyBao.app.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class UserDto {

    private int userNo;
    private String userId;
    private String userPw;
    private String userName;

}
