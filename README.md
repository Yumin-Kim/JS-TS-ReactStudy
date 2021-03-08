# Sleact 클론 코딩하면서 정리하기

- Front는 React로 구현되어 구현
- back은 Nestjs 와 typeORM으로 구현

---

## 백엔드 강의를 통해 들었던 개념 및 용어 , 라이브러리 정리

- DTO ,DAO , Entity Class
- Swagger(테스트 라이브러리)
- 비즈니스 로직
- DI , AOP

---

---

## TypeScript 문법 및 세팅

- Nestjs를 하면서 TypeScript의 데코레이터가 자주 사용되는 것을 볼 수 있게 되면 공부하게됨
- 데코레이터를 Class , Parameter , Property . Method를 사용(데코레이터는 꾸며준다고 비유적으로 말할수 있다.)
- 이와 같이 구현된 데코레이터는 각 호출되는 순서가 다르며 아래와 같이 호출된다.
  - Property >> Method >> Parameter >> Class 순서로 호출된다.

```
//클래스 데코레이터
function classDecorator() {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      newProperty = "new Property";
      hello = "override";
    };
  };
}

function classDecorator_1<T>(parma1: T, param2: T) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      newProperty = parma1;
      hello = param2;
    };
  };
}
//메소드 데코레이터
function methodDecorator() {
  return function (target: any, property: any, descriptor: any) {
    console.log("before");
    console.log(descriptor);
    descriptor.value();
    console.log("After");
  };
}
//프로퍼티 데코레이터
function porpertyDecorator(writable: boolean = true) {
  return function (target: any, decoratedPropertyName: any): any {
    return {
      value: 10,
      writable,
    };
  };
}
//파라미터 데코레이터
function parameterDecorator() {
  return function (target: any, methodName: string, paramIdx: number) {
    console.log(target, methodName, paramIdx);
  };
}

@classDecorator()
class Test {
  property = "property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}

let t = new Test("World");
console.log(t);

@classDecorator_1("Parm1", "Param2")
class Test_Decorator {
  property = "property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}

let test_1 = new Test_Decorator("Test World");
console.log(test_1);

@classDecorator_1("new Param1", "new Param2")
class TestMethod {
  property = "Property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }

  @methodDecorator()
  test() {
    console.log("test");
  }

  test1() {
    console.log("test1");
  }
}

class TestProperty {
  property = "prperty";
  @porpertyDecorator(false)
  hello: any;
}

let test_2 = new TestProperty();
console.log(test_2.hello);

class TestParam {
  property = "property";
  test(
    @parameterDecorator() parma1: string,
    @parameterDecorator() param2: string
  ) {}
}

let test_3 = new TestParam();

```
