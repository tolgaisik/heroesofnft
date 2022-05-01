import { useState, useMemo, useDeferredValue } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Hero from "../components/Hero";
import useHeroes from "../hooks/useHeroes";
export default function IndexPage() {
	const [selectedAttr, setSelectedAttr] = useState("");
	const [heroes, isLoading, error] = useHeroes();
	const [filter, setFilter] = useState("");
	const deferedFilter = useDeferredValue(filter, { timeoutMs: 1000 });
	const attributesOptions = useMemo(() => {
		if (heroes.length > 0) {
			return heroes[0]?.attributes?.map(
				(attribute, index) => {
					if (index === 0) {
						setSelectedAttr(
							attribute?.trait_type.toString()
						);
					}
					return (
						<option
							value={
								attribute?.trait_type
							}
							key={index}
						>
							{attribute?.trait_type}{" "}
						</option>
					);
				}
			);
		}
	}, [heroes]);
	const filteredHeroes = useMemo(() => {
		return heroes.filter((hero) => {
			if (deferedFilter === "") {
				return true;
			}
			const filteredAttr = hero?.attributes?.filter(
				(attr) => {
					return (
						attr?.trait_type ===
							selectedAttr &&
						attr?.value
							.toString()
							.toLowerCase()
							.includes(
								deferedFilter.toLowerCase()
							)
					);
				}
			);
			if (filteredAttr?.length > 0) {
				return true;
			}
			return false;
		});
	}, [heroes, deferedFilter, selectedAttr]);
	function onChange(event) {
		setFilter(event.target.value);
	}
	function filterHandler(event) {
		event.preventDefault();
		setFilter(event.target.value);
	}
	if (error) {
		return <h1>Error</h1>;
	}
	if (isLoading) {
		return <h1>Loading</h1>;
	}
	return (
		<Container className="p-4 border rounded m-5 mx-auto bg-light">
			<Row>
				<Col md={4} lg={4} xl={4}>
					<Form.Group>
						<Form.Label>
							Search Attribute
						</Form.Label>
						<Form.Select
							onChange={onChange}
							aria-label="Default select example"
						>
							{attributesOptions}
						</Form.Select>
					</Form.Group>
				</Col>
				<Col md={8} lg={8} xl={8}>
					<Form.Group>
						<Form.Label>Search</Form.Label>
						<Form.Control
							onChange={filterHandler}
						></Form.Control>
					</Form.Group>
				</Col>
				{filteredHeroes.map((hero, index) => {
					return (
						<Col
							md={4}
							lg={3}
							xl={3}
							key={index}
							className="my-3"
						>
							<Hero {...hero} />
						</Col>
					);
				})}
			</Row>
		</Container>
	);
}
