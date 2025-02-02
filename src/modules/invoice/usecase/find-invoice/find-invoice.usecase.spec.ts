import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice({
  id: new Id("1i"),
  name: "Client 1",
  document: "123",
  address: {
    street: "some address",
    number: "1",
    complement: "",
    city: "some city",
    state: "some state",
    zipCode: "000",
  },
  items: [
    {
      id: "1",
      name: "Product 1",
      price: 30,
    },
    {
      id: "2",
      name: "Product 2",
      price: 20,
    },
  ],
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("Find Invoice UseCase unit test", () => {
  it("should find a invoice", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const input = {
      id: "1i",
    };

    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toEqual(invoice.id.id);
    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);
    expect(result.address.street).toEqual(invoice.address.street);
    expect(result.address.number).toEqual(invoice.address.number);
    expect(result.address.complement).toEqual(invoice.address.complement);
    expect(result.address.city).toEqual(invoice.address.city);
    expect(result.address.state).toEqual(invoice.address.state);
    expect(result.address.zipCode).toEqual(invoice.address.zipCode);
    expect(result.items).toStrictEqual(
      invoice.items.map((item) => {
        return { id: item.id.id, name: item.name, price: item.price };
      })
    );
  });
});
