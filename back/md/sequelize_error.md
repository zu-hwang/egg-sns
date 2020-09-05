# result.get in not a function

result.get is not a function : include 속성으로 관계 가저올때 에러

- 임시해결 : include 속성과 같은 레벨에 raw:true, nest:true` 속성 적용...

```js
const feedWithAssociations = await models.Feed.findAll({
  where: newFeed.id,
  include: [
    {
      model: models.Image,
      where: { feedId: newFeed.id },
    },
  ],
  raw: true, // 에러때문에 넣은 ..ㅠ
  nest: true, // 에러때문에 넣은 ..ㅠ
});
```

# constraint fails

original: Error: Cannot add or update a child row: a foreign key constraint fails (`egg_sns_backend`.`feeds`, CONSTRAINT `feeds_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE)

- 포린키 notnull 설정하니 constraint에러 오지게 나구요~, cascade 설정 해주었눈뎅.. 해도 남. 아 뭐기 문제여
- 오늘도 울고싶구나..
- DB not null 설정 하지말고, 검사기 걸어서 해야하나요오~
- **제약없이 진행할때 > `constraints: false` 속성 추가하라는데, 나는 이거도 안먹음 하하하하**
  - 속성의 위치는 `belongsTo(모델,{속성지정의 제일 상위 속성으로!})`

# 관계테이블에 데이터 한번에 저장하기

한방에 데이터 저장하고 수정하기는 우짬?
[시퀄 공문 참고](https://sequelize.readthedocs.io/en/v3/docs/associations/#belongs-to-many-associations)

## 1:1, 1:다 : `hasOne`, `belongsTo`

```js
// hasOne, belongsTo 에서 아래와 같이 참조하는 테이블에 데이터를 직접 삽입할 수 있다.
return Product.create(
  {
    title: 'Chair',
    creator: {
      first_name: 'Matt',
      last_name: 'Hansen',
    },
  },
  {
    include: [Creator],
  },
);
```

## 1:다. 다:다 : `hasMany`, `belongsToMany`

```js
Product.create(
  // 생성할 내용작성하고
  {
    id: 1,
    title: 'Chair',
    categories: [
      // 여기는 관계 테이블에 직접 데이터 넣는곳
      { id: 1, name: 'Alpha' },
      { id: 2, name: 'Beta' },
    ],
  },
  {
    include: [
      {
        model: Categories,
        as: 'categories', // 별칭사용한다면 이렇게
      },
    ],
  },
);
```

# 후크 hook

- 후크 추가는 3가지 방법있음
  1.  모델정의 마지막 모델 속성옵션에 작성
  2.  에프터함수..?에 직접 작성
  3.  `모델.hook()` 내부에 정의

후크는 모델에 데이터 추가, 조회할때 적용할 규칙일수도 있고, 글로벌하게 설정해서 전체 모델에게 적용되게 하는 함수으~
좋은 예로. 비밀번호 저장전 자동으로 비크립트 해쉬 적용, 꺼낼때 자동으로 해쉬검사해주는 기능을 추가할 수 있다.
