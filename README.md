## Planetscale

https://github.com/planetscale/cli#installation 를 따라해 쓰시는 os에 따라 setup 하시고,

pscale auth login // pscale 에 로그인합니다

pscale region list -> region name 을 확인 하는겁니다 밑에서 region 을 설정할때 좋습니다. 제일 가까운 일본서버 를 선택하면 될거같습니다~

pscale database create {database name} --region {region name}

pscale connect <database name> // 작업하실때 connect 를 하고 작업을해야 합니다 이때 나온 url 을 .env 에서 수정해 사용하면 될거같습니다.

.env

DATABASE_URL=mysql://127.0.0.1:3306/{databasename}

<span style="color:yellowgreen">
ex) pscale database create mydb region ap-northeast -> db생성
</span>

<span style="color:yellowgreen">
 pscale connect mydb -> db연결
</span>

connect를 할경우 실행창을 유지해야 prisma에서 접속이 가능합니다.

## Prisma

npx prisma db push // 모델을 작성한 이후 db 로 업로드를 해주셔야합니다.

해당 파일에서는 User 모델이 prisma.scheme에 작성되어 있습니다.
