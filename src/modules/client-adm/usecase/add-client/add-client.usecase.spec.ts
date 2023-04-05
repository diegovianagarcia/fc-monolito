import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Add Client Usecase unit test", () => {
  it("should add a client", async () => {
    const repository = MockRepository();
    const usecase = new AddClientUseCase(repository);

    const input = {
      name: "Client 1",
      email: "x@x.com",
      document: "123",
      address: {
        street: "some address",
        number: "1",
        complement: "",
        city: "some city",
        state: "some state",
        zipCode: "000",
      },
    };

    const result = await usecase.execute(input);

    expect(repository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.email).toEqual(input.email);
    expect(result.document).toEqual(input.document);
    expect(result.address.street).toEqual(input.address.street);
    expect(result.address.number).toEqual(input.address.number);
    expect(result.address.complement).toEqual(input.address.complement);
    expect(result.address.state).toEqual(input.address.state);
    expect(result.address.zipCode).toEqual(input.address.zipCode);
  });
});
