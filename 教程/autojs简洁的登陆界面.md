## 效果展示

![img](https:////upload-images.jianshu.io/upload_images/17665846-7f44e902b8dba68c.png?imageMogr2/auto-orient/strip|imageView2/2/w/552/format/webp)



## 界面特点

- 输入框使用TextInputEditText, 上方可显示hint文字, 填写不正确, 右侧下方会提示错误
- 按钮点击添加动画

## autojs版本

9.0.4

## 你将知道以下知识点

- 安卓的xml几乎可以拿来就用
- hint如何始终显示

## 脚本概况

- 界面实在太简单了, 没啥好说的

## 代码讲解

##### 1. 导入类



```javascript
importClass(android.animation.Animator);
importClass(android.animation.ValueAnimator);
importClass(android.animation.ObjectAnimator);
importClass(android.animation.AnimatorSet);
importClass(android.util.TypedValue);
importClass(android.text.TextUtils);
importClass(android.widget.Toast);
```

##### 2. 界面xml, 和安卓几乎别无二致



```javascript
ui.layout(
  <vertical>
    <RelativeLayout
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:background="#ffffff"
    >
      <card
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_marginLeft="32dp"
        android:layout_marginTop="64dp"
        android:layout_marginRight="32dp"
        android:layout_marginBottom="64dp"
        app:cardCornerRadius="4dp"
        app:cardElevation="8dp"
      >
        <LinearLayout
          android:layout_width="match_parent"
          android:layout_height="match_parent"
          android:orientation="vertical"
        >
          <img
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:layout_gravity="center_horizontal"
            android:layout_marginTop="16dp"
            src="@drawable/ic_account_circle_black_48dp"
          />

          <com.google.android.material.textfield.TextInputLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginLeft="16dp"
            android:layout_marginTop="16dp"
            android:layout_marginRight="16dp"
            android:hint="用户名"
            app:expandedHintEnabled="true"
            android:textColorHint="#a2c699"
            hintColor="#fff000"
            id="userViewParent"
          >
            <com.google.android.material.textfield.TextInputEditText
              android:id="@+id/edt_user"
              android:layout_width="match_parent"
              android:layout_height="wrap_content"
              android:textColor="#9966cc"
            />
          </com.google.android.material.textfield.TextInputLayout>

          <com.google.android.material.textfield.TextInputLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginLeft="16dp"
            android:layout_marginTop="16dp"
            android:layout_marginRight="16dp"
            android:hint="密码"
            app:expandedHintEnabled="true"
            android:textColorHint="#a2c699"
            id="pwdViewParent"
          >
            <com.google.android.material.textfield.TextInputEditText
              android:id="@+id/edt_pwd"
              android:layout_width="match_parent"
              android:layout_height="wrap_content"
              android:textColor="#9966cc"
            />
          </com.google.android.material.textfield.TextInputLayout>

          <LinearLayout
            android:layout_width="250dp"
            android:layout_height="55dp"
            android:layout_gravity="center_horizontal"
            android:gravity="center_vertical"
            android:layout_marginTop="48dp"
          >
            <card
              app:cardCornerRadius="8dp"
              android:layout_width="30dp"
              android:layout_height="45dp"
              layout_weight="1"
              margin="19"
              id="buttonParent"
            >
              <Button
                android:id="@+id/btn_login"
                android:text="登录"
                android:textColor="#fcfcfc"
                bg="#9966cc"
                bg="#ff00ff"
              />
            </card>
            <card
              app:cardCornerRadius="8dp"
              android:layout_width="30dp"
              android:layout_height="45dp"
              margin="19"
              layout_weight="1"
              id="buttonParent"
            >
              <Button
                android:id="@+id/btn_reg"
                android:text="注册"
                android:textColor="#fcfcfc"
                bg="#9966cc"
                bg="#ff00ff"
              />
            </card>
          </LinearLayout>
        </LinearLayout>
      </card>
    </RelativeLayout>
  </vertical>
);
```

##### 3. 创建动画



```javascript
function createAnimator(view) {
  let animator1 = ObjectAnimator.ofFloat(view, "scaleX", 1, 1.125, 1);
  let animator2 = ObjectAnimator.ofFloat(view, "scaleY", 1, 1.125, 1);
  let animator3 = ObjectAnimator.ofFloat(view, "translationZ", 0, all_2Px("4dp"), 0);
  let set = new AnimatorSet();
  set.playTogether(animator1, animator2, animator3);
  set.setDuration(300);
  return set;
}
```

##### 4. 给按钮设置点击事件



```javascript
ui.btn_login.click(function (view) {
  log("点击了登录按钮");
  let set = createAnimator(view);
  set.start();
  let user = ui.edt_user.getText().toString().trim();
  let pwd = ui.edt_pwd.getText().toString().trim();
  if (TextUtils.isEmpty(user) || TextUtils.isEmpty(pwd)) {
    Toast.makeText(context, "用户名或密码不可为空", Toast.LENGTH_SHORT).show();
    return;
  }
  if ("牙叔教程".equals(user) && "123456".equals(pwd)) {
    Toast.makeText(context, "登录成功", Toast.LENGTH_SHORT).show();
  } else if (!"牙叔教程".equals(user)) {
    ui.edt_user.requestFocus();
    ui.edt_user.setError("用户名错误");
  } else if (!"123456".equals(pwd)) {
    ui.edt_pwd.requestFocus();
    ui.edt_pwd.setError("密码错误");
  }
});
```



## 加入免费社群

![image-20211112110252165](https://gitee.com/xi_fan/img/raw/master/image-20211112110252165.png)

微信搜索：稀饭下雪

回复：autojs，获得autojs稳定安全版本

回复：加群，加入autojs社群

关注我，了解更多有趣好用的脚本，一起玩autojs

